import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateLoader } from 'react-spinners';

export default function Loader() {
    // Force a document repaint to fix blank page issue
    useEffect(() => {
        // Force a reflow/repaint
        const forceRepaint = () => {
            if (document.body) {
                // Read a property that forces layout recalculation
                const height = document.body.offsetHeight;
                // Add a small inline style change to force a repaint
                document.body.style.paddingTop = '0.1px';
                setTimeout(() => {
                    document.body.style.paddingTop = '0';
                }, 0);
            }
        };
        
        // Run immediately and then with a small delay
        forceRepaint();
        const timeoutId = setTimeout(forceRepaint, 50);
        return () => clearTimeout(timeoutId);
    }, []);

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