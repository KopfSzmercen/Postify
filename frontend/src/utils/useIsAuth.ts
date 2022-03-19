import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { myUsernameVar } from "..";
import { MeDocument, MeQuery } from "../generated";

const useIsAuth = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<MeQuery>(MeDocument, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network"
  });
  const params = useLocation();
  const isProtected = params.pathname.includes("/dashboard");

  useEffect(() => {
    if (!loading && !data?.me.success) {
      if (isProtected) navigate("/login", { replace: true });
    } else if (!loading && data?.me.success) {
      myUsernameVar(data!.me.username!);
      if (!isProtected) {
        navigate("/dashboard", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return loading;
};

export default useIsAuth;
