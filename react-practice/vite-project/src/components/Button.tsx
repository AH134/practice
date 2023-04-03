
interface ButtonProps {
    children: string;
    color?: 'primary' | 'secondary'; // ? makes it optional 
    onClick: () => void;
}

const Button = ({children, color = 'primary', onClick}: ButtonProps) => {
    
    return (
        <button className={'btn btn-' + color} onClick={onClick}>{children}</button>
    )

}

export default Button;