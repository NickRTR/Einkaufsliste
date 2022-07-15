<script context="module">
    export function load({ session }) {
        if (!session.user) {
            return {
                status: 302,
                redirect: "/auth/login"
            }
        }

        return {
            status: 200,
            props: {
                user: session.user.email
            }
        }
    }
</script>

<script>
    export let user;
</script>

<h1>Schoppy</h1>

<p>Willkomen {user}</p>