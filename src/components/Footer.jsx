const Footer = () => {
    return (
        <footer className="flex flex-col items-center py-12 px-10 bg-footer-bg border-t border-border  text-muted-text">
            <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-16 w-full justify-items-center-safe max-[1124px]:grid-cols-2 max-[710px]:grid-cols-1">
                <div className="w-80">
                    <h3 translate="no" className="mb-4 text-secundary-text">
                        Film Vault
                    </h3>
                    <p>
                        Application to search movies and series using the TMDb API, built to showcase frontend skills
                        and API integration. Developed by Vinicius de Moura Avemaria.
                    </p>
                </div>
                <ul className="flex flex-col gap-2 w-80">
                    <li className="text-secundary-text mb-2">Tech Stack</li>
                    <li>React.js</li>
                    <li>Tailwind CSS</li>
                    <li>API (TMDb)</li>
                    <li>GitHub Pages</li>
                </ul>
                <div className="flex flex-col gap-2 w-80">
                    <p className="text-secundary-text mb-2">Links</p>
                    <a
                        className="hover:text-secundary-text transition-colors duration-300 ease"
                        href="https://github.com/ViniAvemaria"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        className="hover:text-secundary-text transition-colors duration-300 ease"
                        href="https://www.linkedin.com/in/viniavemaria/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        className="hover:text-secundary-text transition-colors duration-300 ease"
                        href="https://github.com/ViniAvemaria/film-vault"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Repository
                    </a>
                </div>
            </section>
            <hr className="w-full my-10" />
            <p className="text-center">
                &copy; {new Date().getFullYear()} Vinicius de Moura Avemaria. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
