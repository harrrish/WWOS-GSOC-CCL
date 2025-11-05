import { useState } from "react";

export default function CCL() {
  //* ===========================> NA SMILEY CONTACTS

  const smileyContacts_NA = [
    "AMER INTERNAL COMMS SUPPORT GROUP",
    "AMER ERC SUPPORT GROUP",
    "NETWORK OPERATIONS CENTER SUPPORT GROUP",
    "GSOC MGMT SUPPORT GROUP",
    "RISK GLOBAL LAST MILE",
    "GLOBAL OTR SAFETY SUPPORT GROUP",
    "NORTH AMERICA ROC SUPPORT GROUP",
    "NORTH AMERICA OPS PR",
  ];

  //* ===========================> SET COUNTRY
  const [country, setCountry] = useState("US");
  const handleCountryChange = (event) => setCountry(event.target.value);

  //* ===========================> SET SITE CODE
  const [siteCode, setSiteCode] = useState("DDA1");

  //* ===========================> SET SITE TYPE
  const [siteType, setSiteType] = useState("AMZL");
  const handleSiteType = (event) => setSiteType(event.target.value);

  //* ===========================> SET SITE CODE
  const [sev, setSev] = useState("5");
  const handleSev = (event) => setSev(event.target.value);

  //* ===========================> SET SMILEY
  const [smileyContacts, setSmileyContacts] = useState(smileyContacts_NA);

  //* ===========================> SET INCIDENT COMMANDER
  const [ic, setIC] = useState("harisss");

  //* ===========================> SET DRIVER INVOLVED
  const [driverInvolved, setDriverInvolved] = useState("DSP");
  const handleDriverType = (event) => setDriverInvolved(event.target.value);

  //* ===========================> SET REPORTED BY
  const [reportedBy, setReportedBy] = useState("reportedByDP");
  const handleReportedBy = (event) => setReportedBy(event.target.value);

  //* ===========================> SET CUSTOMER IMPACT
  const [cxImpact, setCxImpact] = useState("no");
  const handleCxImpact = (event) => setCxImpact(event.target.value);

  //* ===========================> SET DETRIMENTAL BEHAVIOR
  const [detrimental, setDetrimental] = useState("no");
  const handleDetrimental = (event) => setDetrimental(event.target.value);

  //* ===========================> SET HAZARDOUS
  const [hazardous, setHazardous] = useState("no");
  const handleHazardous = (event) => setHazardous(event.target.value);

  //* ===========================> Delivery Van Vehicle Thermal Event
  const [thermal, setThermal] = useState("no");
  const handleThermal = (event) => setThermal(event.target.value);

  //* ===========================> DOT Regulated
  const [dotRegulated, setDotRegulated] = useState("no");
  const handleDotRegulated = (event) => setDotRegulated(event.target.value);

  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);

  const generateContacts = () => {
    contacts.length = 0;

    if (!siteCode.trim()) {
      setError("Please provide a valid site code !");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!ic.trim()) {
      setError("Please provide a valid IC !");
      setTimeout(() => setError(""), 3000);
      return;
    }
    const newContacts = [...smileyContacts_NA];
    newContacts.push(`${siteCode} IMT`);
    newContacts.push(`${ic}`);
    newContacts.push(`NA SEV${sev}`);
    newContacts.push(`${country} ${siteType} SEV${sev === "5" ? "4" : sev}`);
    newContacts.push(
      `${country} ${driverInvolved} SEV${sev === "5" ? "4" : sev}`
    );

    if (country === "US" && reportedBy === "reportedByDP") {
      newContacts.push("sds-gsoc-flex-incident@amazon.com");
    } else if (country === "CA" && reportedBy === "reportedByDP") {
      newContacts.push("sds-gsoc-flex-incident@amazon.ca");
    } else if (country === "US" && reportedBy === "reportedByDA") {
      newContacts.push("sds-gsoc-driver-potentialharm@amazon.com");
    } else if (country === "CA" && reportedBy === "reportedByDA") {
      newContacts.push("sds-gsoc-driver-potentialharm@amazon.ca");
    } else if (country === "US" && reportedBy === "reportedByCX/CM") {
      newContacts.push("sds-gsoc-cx-incident@amazon.com");
    } else if (country === "CA" && reportedBy === "reportedByCX/CM") {
      newContacts.push("sds-gsoc-cx-incident@amazon.ca");
    } else if (country === "US" && reportedBy === "reportedByHubDA") {
      newContacts.push("sds-gsoc-hub-incident@amazon.com");
    }

    if (cxImpact === "yes") newContacts.push(`${country} cx support group`);
    if (detrimental === "yes") newContacts.push(`AMER LAST MILE RISK`);

    if (hazardous === "yes") {
      newContacts.push(`NA HAZMAT SUPPORT GROUP`);
      newContacts.push(`DANGEROUS GOODS SUPPORT GROUP`);
    }

    if (sev === "1" || sev === "2") {
      newContacts.push(`AMER LAST MILE RISK`);
      newContacts.push(`AMER SEV${sev}`);
      newContacts.push(`AMER RESILIENCE`);
    }

    if (thermal === "yes" && sev === "5") {
      newContacts.push(`AMER LAST MILE VEHICLE THERMAL EVENT LOW SEVERITY`);
    } else if (thermal === "yes") {
      newContacts.push(`AMER LAST MILE VEHICLE THERMAL EVENT`);
    }

    if (dotRegulated === "yes") {
      newContacts.push(`floftus@arcclaims.com `);
      newContacts.push(` ecarroll@arcclaims.com`);
    }

    setContacts([...newContacts]);
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contacts);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-8 font-f1">
      <div className="bg-white w-full sm:max-w-3xl mx-auto py-4 px-8 rounded-sm shadow-xl space-y-6">
        <h1 className="text-3xl text-center font-extrabold text-gray-800">
          Consolidated Contacts List
        </h1>

        {/* //* SELECT COUNTRY */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h1 className="text-xl font-medium w-1/2 text-center">Country:</h1>
          <select
            value={country}
            onChange={handleCountryChange}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            {/* //* NA: USA & CA */}
            <option className="font-medium" value="US">
              US (United States || NA)
            </option>
            <option className="font-medium" value="CA">
              CA (Canada || NA)
            </option>
          </select>
        </div>

        {/* //* SITE CODE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Site Code:
          </h2>
          <input
            type="text"
            value={siteCode}
            onChange={(e) => setSiteCode(e.target.value)}
            className="w-1/2 py-1 px-2 border rounded-sm text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center uppercase"
            placeholder="DDA1"
          />
        </div>

        {/* //* SELECT SITE TYPE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Site type:
          </h2>
          <select
            value={siteType}
            onChange={handleSiteType}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="AMZL">
              AMZL
            </option>
            <option className="font-medium" value="3RD PARTY LOGISTICS 3PL">
              3RD PARTY LOGISTICS (3PL)
            </option>
            <option className="font-medium" value="SUB SAME DAY SSD">
              SUB SAME DAY (SSD)
            </option>
            <option className="font-medium" value="Rural Super Rural RSR">
              Rural Super Rural (RSR)
            </option>
            <option className="font-medium" value="TRADITIONAL FC">
              TRADITIONAL FC
            </option>
            <option className="font-medium" value="Traditional Sortable AR">
              Traditional Sortable AR
            </option>
            <option className="font-medium" value="Sort Center SC">
              Sort Center (SC)
            </option>
          </select>
        </div>

        {/* //* SELECT SEV */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Severity:
          </h2>
          <select
            value={sev}
            onChange={handleSev}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="5">
              5
            </option>
            <option className="font-medium" value="4">
              4
            </option>
            <option className="font-medium" value="3">
              3
            </option>
            <option className="font-medium" value="2">
              2
            </option>
            <option className="font-medium" value="1">
              1
            </option>
          </select>
        </div>

        {/* //* Bcc Individuals */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Bcc Individuals:
          </h2>
          <input
            type="text"
            value={ic}
            onChange={(e) => setIC(e.target.value)}
            className="w-1/2 py-1 px-2 border rounded-sm text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center"
            placeholder="harisss"
          />
        </div>

        {/* //* Driver Involved */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Driver involved:
          </h2>
          <select
            value={driverInvolved}
            onChange={handleDriverType}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="DSP">
              DSP DA
            </option>
            <option className="font-medium" value="FLEX">
              Flex DP
            </option>
            {country === "US" && (
              <option className="font-medium" value="BICYCLE">
                Bicycle DSP
              </option>
            )}
            <option className="font-medium" value="HUB DA">
              Hub DA
            </option>
          </select>
        </div>

        {/* //* REPORTED BY */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex justify-center flex-col gap-1">
          <h2 className="text-xl font-medium text-gray-800 mb-1">
            Reported By:
          </h2>
          <div className="w-full flex items-center justify-between">
            <label
              htmlFor="reportedByDA"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                name="reportedBy"
                id="reportedByDA"
                value="reportedByDA"
                checked={reportedBy === "reportedByDA"}
                onChange={handleReportedBy}
              />
              DA (if CX/CM is known)
            </label>
            <label
              htmlFor="reportedByDP"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                name="reportedBy"
                id="reportedByDP"
                value="reportedByDP"
                checked={reportedBy === "reportedByDP"}
                onChange={handleReportedBy}
              />
              DP
            </label>

            <label
              htmlFor="reportedByCX/CM"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                name="reportedBy"
                id="reportedByCX/CM"
                value="reportedByCX/CM"
                checked={reportedBy === "reportedByCX/CM"}
                onChange={handleReportedBy}
              />
              CX/CM
            </label>
            {country === "US" && (
              <label
                htmlFor="reportedByHubDA"
                className="cursor-pointer flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="reportedBy"
                  id="reportedByHubDA"
                  value="reportedByHubDA"
                  checked={reportedBy === "reportedByHubDA"}
                  onChange={handleReportedBy}
                />
                Hub DA
              </label>
            )}
          </div>
        </div>

        {/* //* CX FACING IMPACT */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Customer Facing Impact:
          </h2>
          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="cxImpactTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="cxImpactTrue"
                name="cxImpact"
                onChange={handleCxImpact}
                checked={cxImpact === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="cxImpactFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="cxImpactFalse"
                name="cxImpact"
                onChange={handleCxImpact}
                checked={cxImpact === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Detrimental Behavior */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Detrimental Behavior:
          </h2>
          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="detrimentalTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="detrimentalTrue"
                name="detrimental"
                onChange={handleDetrimental}
                checked={detrimental === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="detrimentalFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="detrimentalFalse"
                name="detrimental"
                onChange={handleDetrimental}
                checked={detrimental === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Hazardous Material */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Hazardous Material:
          </h2>
          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="hazardousTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="hazardousTrue"
                name="hazardous"
                onChange={handleHazardous}
                checked={hazardous === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="hazardousFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="hazardousFalse"
                name="hazardous"
                onChange={handleHazardous}
                checked={hazardous === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Delivery Van Vehicle Thermal Event  */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            Vehicle Thermal Event :
          </h2>

          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="thermalTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="thermalTrue"
                name="thermal"
                onChange={handleThermal}
                checked={thermal === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="thermalFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="thermalFalse"
                name="thermal"
                onChange={handleThermal}
                checked={thermal === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Dot Regulated */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-800 mb-1 w-1/2 text-center">
            DOT Regulated Vehicle:
          </h2>

          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="dotRegulatedTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="dotRegulatedTrue"
                name="dotRegulated"
                onChange={handleDotRegulated}
                checked={dotRegulated === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="dotRegulatedFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="dotRegulatedFalse"
                name="dotRegulated"
                onChange={handleDotRegulated}
                checked={dotRegulated === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {error && (
          <h1 className="w-full p-3 text-white bg-red-500 rounded-sm text-center font-bold tracking-wider">
            {error}
          </h1>
        )}

        {/* //* SMILEY CONTACTS */}
        {smileyContacts.length > 0 && (
          <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium text-gray-800">
              Smiley contacts ({smileyContacts.length}) :
            </h2>
            <div className="flex flex-col items-end">
              {smileyContacts.map((contact, index) => (
                <p key={index} className="">
                  {contact}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* //* GENERATE CONTACTS BUTTON */}
        <button
          onClick={generateContacts}
          className="w-full p-3 text-white bg-linear-to-br from-blue-500 to-blue-700 rounded-sm hover:from-blue-700 hover:to-blue-500 transition-colors duration-300 cursor-pointer"
        >
          Generate Contacts
        </button>
        {contacts.length > 0 && (
          <div className="space-y-4 flex flex-col gap-1">
            {/* //* CONTACTS DISPLAY */}
            <div className="bg-green-200 p-2 w-[95%] mx-auto rounded-sm shadow-2xl">
              {contacts.map((c, i) => (
                <span key={i}>{c}, </span>
              ))}
            </div>
            {/* //* COPY CONTACTS */}
            <button
              onClick={handleCopy}
              className="px-8 py-1 cursor-pointer bg-black text-white rounded-sm transition-colors hover:bg-transparent border-2 hover:text-black"
            >
              Copy Contacts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
