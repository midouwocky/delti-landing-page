import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {
    emailjs.init('LZ1no7XPvxbj1MS_z');
  }

  sendEmail(formData: Record<string, unknown>): Promise<EmailJSResponseStatus> {
    return emailjs.send('service_qdx6eg7', 'template_lhxkmco', formData);
  }
}
