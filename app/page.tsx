import User from "@/src/components/User/User";
import Button from "../src/components/Button";
import { CookiesProvider } from "next-client-cookies/server";
import axios from "axios";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { RequestLogin } from "./utils/authorise-user";

export default function Home({}: any) {
  const cookieStore = cookies();
  let isUserAuthenticated = false;
  cookieStore.get("t") ? (isUserAuthenticated = true) : "";

  return (
    <div>
      {isUserAuthenticated ? (
        <Suspense fallback={<h1>Loading user...</h1>}>
          <User />
        </Suspense>
      ) : (
        <>
          <Button label="Login" click={RequestLogin} />
        </>
      )}
    </div>
  );
}
