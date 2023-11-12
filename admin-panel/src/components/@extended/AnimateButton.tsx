import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function AnimateButton({ children }: Props) {
    return (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }}>
            {children}
        </motion.div>
    );
}

AnimateButton.defaultProps = {
    type: 'scale',
};
