import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { choiceType, vhTpe } from "../../../constants/applications";
import QRCode from "qrcode";
import tauLogo from "../../../assets/images/tau.png";

var opts = {
  errorCorrectionLevel: "H",
  type: "image/jpeg",
  quality: 0.3,
  margin: 1,
  color: {
    dark: "#038523",
    light: "#ffffff",
  },
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    flexGrow: 1,
  },
});

export default function RenderPDF({ id }) {
  const { applications } = useSelector((state) => ({
    applications: state.applications,
  }));

  const { singleAppData } = applications;

  function GetQrCode(value) {
    let imgUri = null;
    QRCode.toDataURL(value, opts, function (err, url) {
      if (err) throw err;

      imgUri = url;
    });

    return imgUri;
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ margin: "auto" }}>
            <View
              style={{ border: "1px solid black", padding: 10, width: 410 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 150 }}
                  source={{
                    uri: `${process.env.REACT_APP_ZEPNDS_URI}/api/client/${singleAppData?.userInfo?.avatar}`,
                  }}
                />
                {singleAppData?.userInfo ? (
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 15, width: 300 }}>
                      {singleAppData?.userInfo?.name}
                    </Text>
                    <Text style={{ fontSize: 11, marginTop: 3 }}>
                      Email: {singleAppData?.userInfo?.email}
                    </Text>
                    <Text style={{ fontSize: 11, marginTop: 3 }}>
                      Birth date:{" "}
                      {moment(singleAppData?.userInfo?.birthDate).format("ll")}
                    </Text>
                    <Text style={{ fontSize: 11, marginTop: 1, width: 200 }}>
                      Address: {singleAppData?.userInfo?.address}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        marginTop: 1,
                        textTransform: "capitalize",
                      }}
                    >
                      Civil Status: {singleAppData?.userInfo?.civilStatus}
                    </Text>
                  </View>
                ) : null}
                <Image src={tauLogo} style={{ width: 80, marginTop: 20 }} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
                width: 410,
              }}
            >
              <View style={{ width: 300, paddingLeft: 10 }}>
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}>
                  Gate Pass ID
                </Text>
                <Text style={{ fontSize: 13 }}>
                  Application Type:{" "}
                  {
                    choiceType[
                      singleAppData?.applications?.[0]?.applicationType
                    ]
                  }
                </Text>
                <Text style={{ fontSize: 13, marginTop: 1 }}>
                  Vehicle Plate Number:{" "}
                  {singleAppData?.applications?.[0]?.plateNumber}
                </Text>
                <Text style={{ fontSize: 13, marginTop: 1 }}>
                  Vehicle Type:{" "}
                  {vhTpe[singleAppData?.applications?.[0]?.typeOfVehicle]}
                </Text>

                {singleAppData?.applications?.[0]?.dateOfPayment ? (
                  <Text style={{ fontSize: 13, marginTop: 1 }}>
                    Date Expired:{" "}
                    {moment(
                      Date(singleAppData?.applications?.[0]?.dateOfPayment)
                    )
                      .add(1, "year")
                      .format("ll")}
                  </Text>
                ) : null}
              </View>
              <View style={{ padding: "10px 10px 10px 0px" }}>
                <Image
                  style={{ width: 100 }}
                  source={{
                    uri: GetQrCode(`${id}`),
                  }}
                  alt="sample"
                />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <Box sx={{ margin: 5 }}>
      <PDFViewer style={{ width: "100%", height: 1000 }}>
        <MyDocument />
      </PDFViewer>
    </Box>
  );
}
