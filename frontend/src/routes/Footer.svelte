<script>
    const date = new Date()
    const year = date.getFullYear()
</script>

<footer>
    <p class="disclaimer"><strong>Disclaimer:</strong>This project is dedicated to providing accurate and up-to-date information. However, please note that there might occasionally be discrepancies. If you're purchasing tickets through links found here, kindly double-check the movie details, date, venue, and time before completing your purchase. Your patience and understanding are greatly appreciated.</p>
    <p class="support"><strong>Support This Project:</strong> If you find this service helpful, consider making a <a href="https://ko-fi.com/nmsalvatore">donation</a>. Every contribution plays a crucial role in sustaining and improving this project. Your support enables ongoing enhancements and ensures the continued availability of this resource. Thank you for any support you can offer.</p>
    <p class="support"><strong>Contact Me:</strong>For feedback, inquiries, or support related to this project, feel free to reach out via <a href="mailto:hello@nmsalvatore.com">email</a> or visit my <a href="http://nmsalvatore.com">personal website</a> for more information about me and my work.</p>
    <p class="copyright">Copyright &#169; { year } Nicholas M. Salvatore</p>
</footer>

<style>
    footer {
        color: #6f6f6f;
        background: #fff;
        padding: 2rem;
        font-size: 12px;
        line-height: 2.2;
    }

    p {
        margin-bottom: 1.5rem;
    }

    p > strong {
        color: #555;
        margin-right: 4px;
    }

    p > a {
        color: #556;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
        text-decoration-style: dotted;
        text-decoration-color: #aab;
    }

    p.copyright {
        margin-top: 3rem;
        margin-bottom: 0;
    }

    @media only screen and (max-width: 600px) {
        footer {
            padding: 1rem;
        }
    }
</style>