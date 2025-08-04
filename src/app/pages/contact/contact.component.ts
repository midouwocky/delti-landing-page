import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LinksComponent } from '../../components/links/links.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
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
  recaptchaPassed = false;

  private recaptchaWidgetId: number | undefined;
  private recaptchaLoadSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recaptchaLoadSubscription = fromEvent(window, 'recaptchaLoad').subscribe(() => {
      this.renderRecaptcha();
    });
  }

  ngAfterViewInit(): void {
    if (typeof grecaptcha !== 'undefined' && typeof grecaptcha.render === 'function' && !this.recaptchaWidgetId) {
      this.renderRecaptcha();
    }
  }

  ngOnDestroy(): void {
    if (this.recaptchaLoadSubscription) {
      this.recaptchaLoadSubscription.unsubscribe();
    }
  }

  private renderRecaptcha(): void {
    if (this.recaptchaContainer && grecaptcha && grecaptcha.render) {
      this.recaptchaWidgetId = grecaptcha.render(this.recaptchaContainer.nativeElement, {
        sitekey: this.siteKey,
        theme: 'light',
        callback: (token: string) => {
          this.recaptchaPassed = true;
          this.cdr.detectChanges();
        },
        'expired-callback': () => {
          this.recaptchaPassed = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      console.warn('reCAPTCHA container or grecaptcha API not ready for rendering.');
    }
  }

  async onSubmit() {
    if (this.contactForm.valid && this.recaptchaPassed) {
      const recaptchaToken = await grecaptcha.getResponse(this.recaptchaWidgetId);

      if (!recaptchaToken) {
        this.errorMessage = 'contact.form.recaptcha_error';
        return;
      }

      const formData = this.contactForm.value;
      formData['g-recaptcha-response'] = recaptchaToken;

      this.contactService
        .sendEmail(formData)
        .then(
          () => {
            this.successMessage = 'contact.form.success';
            this.contactForm.reset();
            grecaptcha.reset(this.recaptchaWidgetId);
            this.recaptchaPassed = false;
            this.cdr.detectChanges();
          },
          (error) => {
            console.log('FAILED...', error.text);
            this.errorMessage = 'contact.form.error';
          },
        );
    }
  }
}
