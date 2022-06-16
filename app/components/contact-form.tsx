import { Todo } from "./todo";

export const ContactForm = () => {
  return (
    <Todo badge title="Contact form" className="bg-blue-700 text-white h-96">
      <div className="text-3xl font-semibold text-orange-200">
        Vil du vite mer om hvordan vi kan hjelpe deg?
      </div>
      <span>Fyll ut skjemaet så kontakter vi deg!</span>
    </Todo>
  );
};