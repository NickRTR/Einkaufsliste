import supabase from "$lib/supabase";
import * as cookie from "cookie";

export async function post({ request }) {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        return {
            status: 400,
            body: {
                error: "Enter a valid email and password.",
            },
        }
    }

    if (!email || !password) {
        return {
            status: 400,
            body: {
                error: "Email and password are required.",
            },
        }
    }

    let { user, error } = await supabase.auth.signIn({ email, password })

    if (error) {
        return {
            status: 400,
            body: {
                error
            },
        }
    }

    return {
        status: 200,
        body: {
            user,
            success: "Success.",
        }
    }
}

