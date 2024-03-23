import { Box, Button, Typography } from "@mui/material";
import ReactLottie from "../../common/lottie";
import approval from "../../assets/lottiefiles/approval.json";
import { useProcessPaymentApplicationMutation } from "../../store/application.slice";
import { getParameterByName } from "../../helpers/parameterHelpers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentApproval() {
  const [loading, setLoading] = useState(false);
  const [reqPayment, resPayment] = useProcessPaymentApplicationMutation();
  const paymentId = getParameterByName("paymentId");
  const payerId = getParameterByName("PayerID");
  const handleAgreePayment = () => {
    reqPayment({
      token: JSON.parse(window.localStorage.getItem("accessToken")),
      appId: window.localStorage.getItem("appId"),
      total: window.localStorage.getItem("payment"),
      email: window.localStorage.getItem("email"),
      paymentId,
      payerId,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (resPayment.isSuccess) {
      setLoading(false);
      navigate(
        `/userdashboard?email=${window.localStorage.getItem(
          "email"
        )}&token=${JSON.parse(window.localStorage.getItem("accessToken"))}`
      );
    }
    if (resPayment.isLoading) {
      setLoading(true);
    }
  }, [resPayment, navigate]);

  return (
    <Box>
      <Box {...{ mt: 2 }}>
        <ReactLottie file={approval} width="100%" height="200" />
        <Typography {...{ padding: 2, textAlign: "center" }} variant="body1">
          This is not yet deducted into your account unless click confirm
          button,We need your approval, payment is not refundable, please
          confirm to finish this payment process,
        </Typography>
      </Box>
      <Box {...{ padding: 2 }}>
        <Button
          disabled={loading ? true : false}
          onClick={handleAgreePayment}
          variant="contained"
          fullWidth
        >
          {loading ? "Processing payment.." : "Continue"}
        </Button>
      </Box>
    </Box>
  );
}
