<script>
    import logo from "../assets/logo.svg"
    import logo2 from "../assets/logo2.svg"
</script>

<section id="welcome" class="container">
    <h1>Hi there, I'm <span class="name">Seniru</span></h1>
    <hr />
    <p>
        Welcome the the page of <span class="important">Seniru Pasan Indira</span>,
    </p>
    <section id="about">
        <div>
            <p>
                A self taught programmer and a <span class="important">undergraduate student</span>
                of <span class="important">SLIIT</span> (Sri Lanka Institute of Technology) that
                specializes in <span class="important">Software Engineering.</span>
            </p>
            <p>
                I love <span class="important">researching</span> into topics that have not been
                explored a lot by people,<br />
                and doing lots of experiments with such topics.<br />
                I like to think differently than other people and plan things in my own way.
            </p>
            <p>
                Among the other interests of me, is a huge passion for <span class="important"
                    >strength, strongman, and powerlifting.</span
                ><br />
                Cats are my best friends.
            </p>
        </div>
        <img src={logo2} alt="Logo" />
    </section>
    <a href="https://www.linkedin.com/in/seniru-pasan-51331a286/" target="_blank">
        <i class="fa-brands fa-linkedin"></i>
        LinkedIn
    </a>
    |
    <a href="https://www.instagram.com/senirupasan/" target="_blank">
        <i class="fa-brands fa-instagram"></i>
        @senirupasan
    </a>
    |
    <a href="mailto:senirupasan@gmail.com" target="_blank">
        <i class="fa-solid fa-envelope"></i>
        senirupasan@gmail.com
    </a>
    |
    <a href="https://github.com/Seniru" target="_blank">
        <i class="fa-brands fa-github"></i>
        Github
    </a>
    <hr />
</section>

<style lang="scss">
    @use "../utils/variables" as v;

    #welcome {
        #about {
            position: relative;

            * {
                display: inline-block;
                vertical-align: top;
            }

            div {
                width: 80%;
            }

            img {
                width: 150px;
                height: 150px;
            }
        }
    }

    .name {
        color: v.$tertiary-color;
    }
</style>
