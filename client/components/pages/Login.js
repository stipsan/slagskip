const placeholderLabel = 'Username';
const buttonLabel = 'Enter';

export default function Login() {
  return <section className="section--login">
    <form>
      <input placeholder={placeholderLabel} />
      <button type="submit">{buttonLabel}</button>
    </form>
  </section>;
};