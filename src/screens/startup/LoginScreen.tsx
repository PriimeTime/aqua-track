import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginForm } from "@/components/settings";
import { ContentPage } from "@/components/wrappers";

function LoginScreen() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  return (
    <ContentPage title={t("settings.account.loginHeader")}>
      <LoginForm loading={loading} setLoading={setLoading}></LoginForm>
    </ContentPage>
  );
}

export { LoginScreen };
