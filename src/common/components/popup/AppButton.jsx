
import MuiButton from './MuiButton';
import MuiToggleButton from './MuiToggleButton';
import PlainTextButton from './PlainTextButton';

export default function AppButton({ ...props }) {
    const button = {
        contained: MuiButton,
        outlined: MuiButton,
        text: MuiButton,
        toggle: MuiToggleButton,
        default: PlainTextButton,
    };

    const Button = button[props.variant] ?? button.default;

    return <Button {...props} />;
}
