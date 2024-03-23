import { Box, Button, Stack, Typography } from "@mui/material";
import cash from "../../assets/images/cash.png";
import paypal from "../../assets/images/paypal.png";
import PaymentLoading from "../../assets/lottiefiles/payment_loading.json";
import gcashngkalukuhan from "../../assets/images/gcash_kuno.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getParameterByName } from "../../helpers/parameterHelpers";
import {
  updatePaymentData,
  useGetOneApplicationMutation,
  usePostPaymentApplicationMutation,
} from "../../store/application.slice";
import { useDispatch, useSelector } from "react-redux";
import { choiceType, vhTpe } from "../../constants/applications";
import ReactLottie from "../../common/lottie";

const payment = [
  {
    name: "paypal",
    icon: paypal,
  },
  {
    name: "cash",
    icon: cash,
  },
  {
    name: "gcashngkalukuhan",
    icon: gcashngkalukuhan,
  },
];

const paymentChoice = {
  cash: "Pay in cash to cashier",
  paypal: "Pay with paypal/credit card/debit card",
};

export default function Payment() {
  const [active, setActive] = useState(null);
  const [reqGetOneApp, resGetOneApp] = useGetOneApplicationMutation();
  const [reqPayment, resPayment] = usePostPaymentApplicationMutation();
  const navigate = useNavigate();
  const email = getParameterByName("email");
  const token = getParameterByName("token");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const { applications } = useSelector((state) => ({
    applications: state.applications,
  }));

  const { paymentData, selectIdToPay } = applications;

  useEffect(() => {
    reqGetOneApp({ email, token });
    window.localStorage.setItem("accessToken", JSON.stringify(token));
  }, [email, reqGetOneApp, token]);

  useEffect(() => {
    if (resGetOneApp.isSuccess) {
      setLoading(false);

      window.localStorage.setItem("payment", paymentData?.[0].payment);
      window.localStorage.setItem("email", paymentData?.[0].email);
      window.localStorage.setItem("appId", paymentData?.[0]._id);
      dispatch(updatePaymentData(resGetOneApp.data));
    }
    if (resGetOneApp.isLoading) {
      setLoading(true);
    }
  }, [resGetOneApp, dispatch, email, paymentData, selectIdToPay]);

  const handleClick = (name) => {
    setActive(name);
  };

  const handlePaypalAction = () => {
    const _payload = {
      name: "Gatepass for Tarlac Agricultural University",
      price: `${paymentData?.[0].payment}`,
      desc: `payment for gatepass ,application type ${
        choiceType[paymentData?.[0].applicationType]
      } with vehicle ${vhTpe[paymentData?.[0].typeOfVehicle]} plate number is ${
        paymentData?.[0].plateNumber
      }`,
    };

    reqPayment(_payload);
  };

  useEffect(() => {
    if (resPayment.isSuccess) {
      setLoadingPayment(true);
      const link = resPayment.data.links.filter(
        (item) => item.rel === "approval_url"
      );
      if (link) {
        window.location.replace(link[0].href);
      }
    }
    if (resPayment.isLoading) {
      setLoadingPayment(true);
    }
  }, [resPayment]);

  const handleSubmit = () => {
    switch (active) {
      case "cash":
        return navigate(`/userdashboard?email=${email}&token=${token}`);
      case "paypal":
        return handlePaypalAction();
      case "gcashngkalukuhan":
        return navigate(
          `/gcashngkalukuhan?email=${email}&token=${token}&type=${paymentData?.[0].applicationType}&vehicle=${paymentData?.[0].typeOfVehicle}`
        );
      default:
        return;
    }
  };

  return (
    <>
      <Box>
        {loading ? (
          <>
            <Box {...{ margin: "20px" }}>
              <Box
                {...{
                  border: "3px solid #b1b3b5",
                  borderRadius: "10px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <Box {...{ margin: 1, textAlign: "center" }}>
                  <ReactLottie
                    width="100%"
                    height="150px"
                    file={PaymentLoading}
                  />
                  <Typography>Loading payment methods</Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              {...{ textAlign: "center", paddingTop: 2 }}
              variant="h6"
            >
              Select your payment options
            </Typography>
          </>
        ) : (
          <>
            {payment.map((item, index) => (
              <Box key={index} {...{ margin: "20px" }}>
                <Box
                  {...{
                    border:
                      active === item.name
                        ? "3px solid #579ee6"
                        : "3px solid #b1b3b5",
                    borderRadius: "10px",
                    width: "100%",
                    margin: "auto",
                  }}
                  onClick={() => handleClick(item.name)}
                >
                  <Box {...{ margin: 1, textAlign: "center" }}>
                    <img
                      style={{ width: 100 }}
                      src={item.icon}
                      alt={item.name}
                    />
                    <Typography>{paymentChoice[item.name]}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
      <Stack {...{ display: "flex", margin: 2 }}>
        <Button onClick={handleSubmit} variant="contained">
          {loadingPayment ? "please wait.." : "Continue"}
        </Button>
      </Stack>
    </>
  );
}
