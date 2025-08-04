import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LinksComponent } from '../../components/links/links.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
declare const grecaptcha: any;

@Component({
  selector: 'app-contact',
  imports: [ TranslateModule, LinksComponent, FontAwesomeModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnDestroy, AfterViewInit {
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef; 
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarker = faMapMarker;
  contactEmail = environment.contactEmail;
  contactPhone = environment.contactPhone;
  contactAddress = environment.contactAddress;
  contactPhoneText = environment.contactPhoneText;

  siteKey = '6LdbDJorAAAAALkCUQvA7qsE3mlJAO8vtwH1kdfo';
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private recaptchaWidgetId: number | undefined; // To store the ID of the rendered widget
  private recaptchaLoadSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    emailjs.init('LZ1no7XPvxbj1MS_z');
  }

  ngOnInit(): void {
    // Listen for the custom 'recaptchaLoad' event dispatched from index.html
    this.recaptchaLoadSubscription = fromEvent(window, 'recaptchaLoad').subscribe(() => {
      this.renderRecaptcha();
    });
  }

  ngAfterViewInit(): void {
    // If reCAPTCHA has already loaded (e.g., navigating back to the component), render it.
    // This is important for cases where the component might load after the global event.
    if (typeof grecaptcha !== 'undefined' && typeof grecaptcha.render === 'function' && !this.recaptchaWidgetId) {
      this.renderRecaptcha();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.recaptchaLoadSubscription) {
      this.recaptchaLoadSubscription.unsubscribe();
    }
    // Optionally reset/destroy the reCAPTCHA widget if navigating away
    if (this.recaptchaWidgetId !== undefined) {
       // grecaptcha.reset() might be sufficient, or check for a destroy method if available
    }
  }

  // This method explicitly renders the reCAPTCHA widget
  private renderRecaptcha(): void {
    if (this.recaptchaContainer && grecaptcha && grecaptcha.render) {
      this.recaptchaWidgetId = grecaptcha.render(this.recaptchaContainer.nativeElement, {
        sitekey: this.siteKey,
        theme: 'light', // or 'dark'
        // 'callback' and 'expired-callback' are useful for more control
        // callback: (token: string) => console.log('reCAPTCHA solved:', token),
        // 'expired-callback': () => console.log('reCAPTCHA expired')
      });
      console.log('reCAPTCHA widget rendered successfully.');
    } else {
      console.warn('reCAPTCHA container or grecaptcha API not ready for rendering.');
    }
  }

  async onSubmit(e: Event) {
    if (this.contactForm.valid) {
      e.preventDefault();

      const recaptchaToken = await grecaptcha.getResponse();

      if (!recaptchaToken) {
        alert('Please complete the reCAPTCHA challenge.');
        return;
      }

      console.log(recaptchaToken);

      const formData = this.contactForm.value;
      formData['g-recaptcha-response'] = recaptchaToken;

      emailjs
        .send('service_qdx6eg7', 'template_lhxkmco', formData)
        .then(
          () => {
            console.log('SUCCESS!');
            this.successMessage = 'contact.form.success';
            this.contactForm.reset();
          },
          (error) => {
            console.log('FAILED...', (error as EmailJSResponseStatus).text);
            this.errorMessage = 'contact.form.error';
          },
        );
    }
  }
}
