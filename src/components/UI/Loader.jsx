import { motion } from 'framer-motion';
import { RotateLoader } from 'react-spinners';

export default function Loader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
        >
            <RotateLoader color="#2d3748" size={15} />
        </motion.div>
    );
}