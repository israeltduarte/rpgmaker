"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ITCity } from './definitions';

export type State = {
  errors?: {
    status?: string[];
  };
  message?: string | null;
};

export async function fetchCities(): Promise<ITCity[]> {
  const res = await fetch("http://localhost:8082/content-back/api/cities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const json = await res.json();

  switch (res.status) {
    case 200:
      return json.content;
    case 401:
      throw new Error('Invalid Credentials');
    default:
      throw new Error('Something went wrong');
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData): Promise<string> {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http:localhost:8080/rpgmaker-back/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  switch (res.status) {
    case 200:
      cookies().set("Authorization", json.token, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 14400000,
        path: "/",
        sameSite: "strict",
      });
      break;
    case 401:
      return 'Invalid Credentials';
    default:
      return 'Something went wrong';
  }

  if (res.ok) {
    redirect("/dashboard");
  } else {
    return json.error;
  }
}

export async function signOut() {
  cookies().set("Authorization", "");
  redirect("/");
}