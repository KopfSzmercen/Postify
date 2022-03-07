import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { myUsernameVar } from "..";
import { MeDocument, MeQuery } from "../generated";

const useIsAuth = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<MeQuery>(MeDocument, {
    fetchPolicy: "network-only"
  });
  const params = useLocation();
  const isProtected = params.pathname.includes("/dashboard");

  useEffect(() => {
    console.log(data?.me);

    if (!loading && !data?.me.success) {
      if (isProtected) navigate("/login", { replace: true });
    } else if (!loading && data?.me.success) {
      if (!isProtected) navigate("/dashboard", { replace: true });
      myUsernameVar(data!.me.username!);
    }
  }, [loading]);
};

export default useIsAuth;
