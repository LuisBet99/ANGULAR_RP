import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicialización del formulario usando FormBuilder
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    // Verificación de la validez del formulario
    if (this.updatePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.updatePasswordForm.value;

      // Verificación de que las contraseñas coincidan
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }

      // Llamada al servicio para actualizar la contraseña
      this.authService.updatePassword(oldPassword, newPassword).subscribe(
        response => {
          alert('Password updated successfully');
          this.router.navigate(['/ver-generaciones']); // Redirigir a otra página después de actualizar la contraseña
        },
        error => {
          alert('Failed to update password');
        }
      );
    }
  }
}
