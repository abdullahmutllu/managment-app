'use client';
export default function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Kullanıcı adı" />
        <input type="password" placeholder="Şifre" />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}
