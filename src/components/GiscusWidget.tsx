import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function GiscusWidget() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Initialize theme based on document class
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');

        // Observer for class changes on html element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "class"
                ) {
                    const isDark =
                        document.documentElement.classList.contains("dark");
                    setTheme(isDark ? "dark" : "light");
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <Giscus
                id="comments"
                repo="imnotnoahhh/personal-blog" // PLEASE CHANGE THIS TO YOUR REPO
                repoId="R_kgDOMxxxxxxxx" // PLEASE CHANGE THIS TO YOUR REPO ID
                category="Announcements"
                categoryId="DIC_kwDOMxxxxxxxx"
                mapping="pathname"
                term="Welcome to my blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
