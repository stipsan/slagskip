const placeholderLabel = 'Username';
const buttonLabel = 'Enter';

export default function Login() {
  return <section className="section section--login">
    <form>
      <input placeholder={placeholderLabel} minLength={4} required={true} />
      <button type="submit">{buttonLabel}</button>
    </form>
  </section>;
};