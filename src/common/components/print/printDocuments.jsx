import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import tauLogo from "../../../assets/images/tau.png";

const MyDocument = (data) => {
  return (
    <Document>
      <Page size="A4" style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={tauLogo} style={{ width: 50, margin: "30px 10px" }} />
          <View>
            <Text style={{ fontSize: 15 }}>Tarlac Agricultural University</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            List Applications
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                gap: 3,
                backgroundColor: "#038523",
                color: "whitesmoke",
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                padding: "5px 5px",
                margin: "10px 10px 0px 10px",
              }}
            >
              {[
                { name: "Email", id: 1, width: 200 },
                { name: "Application Type", id: 2, width: 150 },
                { name: "Payment", id: 3, width: 100 },
                { name: "Status", id: 4, width: 200 },
              ].map((header) => (
                <View style={{ width: header.width }}>
                  <Text style={{ fontSize: "10px" }}>{header.name}</Text>
                </View>
              ))}{" "}
            </View>
            {data.data.map((i) => (
              <View
                style={{
                  padding: "5px 5px",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  margin: "0px 6px",
                  gap: 3,
                }}
                key={i.id}
              >
                <View style={{ width: 175 }}>
                  <Text style={{ fontSize: "10px" }}>{i.email}</Text>
                </View>
                <View style={{ width: 128 }}>
                  <Text
                    style={{ fontSize: "10px", textTransform: "capitalize" }}
                  >
                    {i.applicationType === "publicvehicle"
                      ? "public vehicle"
                      : i.applicationType}
                  </Text>
                </View>
                <View style={{ width: 85 }}>
                  <Text style={{ fontSize: "10px" }}>
                    {i.payment.substring(2)} peso
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: "10px", textTransform: "capitalize" }}
                  >
                    {i.appStatus}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function PrintDocuments(data) {
  return (
    <PDFViewer
      style={{ width: 800, height: 700, marginTop: 64, padding: "10px 10px" }}
    >
      <MyDocument data={data.data} />
    </PDFViewer>
  );
}
