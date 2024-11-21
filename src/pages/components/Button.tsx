interface ButtonProps {
  text: string;
  onClick: () => void;
}

function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-fit py-1 px-4 text-sm rounded-md bg-blue-500 text-white font-medium hover:bg-blue-800"
    >
      {text}
    </button>
  );
}

export default Button;
