import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { LinksComponent } from '../../components/links/links.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ TranslateModule, LinksComponent, FontAwesomeModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarker = faMapMarker;
  contactEmail = environment.contactEmail;
  contactPhone = environment.contactPhone;
  contactAddress = environment.contactAddress;
  contactPhoneText = environment.contactPhoneText;

  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

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
  }

  onSubmit(e: Event) {
    if (this.contactForm.valid) {
      e.preventDefault();

      emailjs
        .sendForm('service_qdx6eg7', 'template_lhxkmco', e.target as HTMLFormElement, {
          publicKey: 'LZ1no7XPvxbj1MS_z',
        })
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
