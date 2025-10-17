import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.AccessToken);

        this.userService.get_info_user(username).subscribe(
          (userInfo) => {
            // 🔥 Atualiza userService (já salva no localStorage e dispara para o Header)
            this.userService.setUser(userInfo);

            // this.toastr.success('Login realizado com sucesso!');
            this.router.navigate(['/agendamentos']);
          },
          (error) => {
            localStorage.removeItem('token');
            this.toastr.error('Erro ao obter informações do usuário', 'Algo deu errado!');
            this.loading = false;
          }
        );
      },
      error: (error) => {
        this.toastr.error('Usuário ou senha incorretos', 'Algo deu errado!');
        this.loading = false;
      }
    });
  }

}
