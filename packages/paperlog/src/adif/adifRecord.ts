// generated by scripts/adif_tables.ts
import { optional, string, number, Infer, object } from "superstruct";
import { AdifTime, AdifDate } from "./types";
import { BandEnum } from "./bands";
import { ModeEnum } from "./modes";

export const AdifRecord = object({
  // the contacted station's complete mailing address: full name, street address, city, postal code, and country
  // address: MultilineString,

  // the contacted station's complete mailing address: full name, street address, city, postal code, and country
  // addressIntl: IntlMultilineString,

  // the contacted station's operator's age in years in the range 0 to 120 (inclusive)
  // age: Number,

  // the geomagnetic A index at the time of the QSO in the range 0 to 400 (inclusive)
  // aIndex: Number,

  // the logging station's antenna azimuth, in degrees with a value between 0 to 360 (inclusive). Values outside this range are import-only and must be normalized for export (e.g. 370 is exported as 10). True north is 0 degrees with values increasing in a clockwise direction.
  // antAz: Number,

  // the logging station's antenna elevation, in degrees with a value between -90 to 90 (inclusive). Values outside this range are import-only and must be normalized for export (e.g. 100 is exported as 80). The horizon is 0 degrees with values increasing as the angle moves in an upward direction.
  // antEl: Number,

  // the signal path
  // antPath: Enumeration,

  // the contacted station's ARRL section
  // arrlSect: Enumeration,

  // the list of awards submitted to a sponsor. note that this field might not be used in a QSO record. It might be used to convey information about a user’s “Award Account” between an award sponsor and the user. For example, AA6YQ might submit a request for awards by sending the following: <CALL:5>AA6YQ <AWARD_SUBMITTED:64>ADIF_CENTURY_BASIC,ADIF_CENTURY_SILVER,ADIF_SPECTRUM_100-160m
  // awardSubmitted: SponsoredAwardList,

  // the list of awards granted by a sponsor. note that this field might not be used in a QSO record. It might be used to convey information about a user’s “Award Account” between an award sponsor and the user. For example, in response to a request “send me a list of the awards granted to AA6YQ”, this might be received: <CALL:5>AA6YQ <AWARD_GRANTED:64>ADIF_CENTURY_BASIC,ADIF_CENTURY_SILVER,ADIF_SPECTRUM_100-160m
  // awardGranted: SponsoredAwardList,

  // QSO Band
  band: BandEnum,

  // in a split frequency QSO, the logging station's receiving band
  // bandRx: Enumeration,

  // the contacted station's Callsign
  call: optional(string()),

  // contest check (e.g. for ARRL Sweepstakes)
  // check: String,

  // contest class (e.g. for ARRL Field Day)
  // class: String,

  // the date the QSO was last uploaded to the Club Log online service
  // clublogQsoUploadDate: Date,

  // the upload status of the QSO on the Club Log online service
  // clublogQsoUploadStatus: Enumeration,

  // the contacted station's Secondary Administrative Subdivision (e.g. US county, JA Gun), in the specified format
  // cnty: Enumeration,

  // comment field for QSO recommended use: information of interest to the contacted station's operator
  // comment: String,

  // comment field for QSO recommended use: information of interest to the contacted station's operator
  // commentIntl: IntlString,

  // the contacted station's Continent
  // cont: Enumeration,

  // the callsign of the individual operating the contacted station
  // contactedOp: String,

  // QSO Contest Identifier use enumeration values for interoperability
  // contestId: String,

  // the contacted station's DXCC entity name
  // country: String,

  // the contacted station's DXCC entity name
  // countryIntl: IntlString,

  // the contacted station's CQ Zone in the range 1 to 40 (inclusive)
  // cqz: PositiveInteger,

  // the list of credits sought for this QSO Use of data type AwardList and enumeration Award are import-only
  // creditSubmitted: CreditList,AwardList,

  // the list of credits granted to this QSO Use of data type AwardList and enumeration Award are import-only
  // creditGranted: CreditList,AwardList,

  // the contacted station's DARC DOK (District Location Code) A DOK comprises letters and numbers, e.g. <DARC_DOK:3>A01
  // darcDok: Enumeration,

  // the distance between the logging station and the contacted station in kilometers via the specified signal path with a value greater than or equal to 0
  // distance: Number,

  // the contacted station's DXCC Entity Code <DXCC:1>0 means that the contacted station is known not to be within a DXCC entity.
  // dxcc: Enumeration,

  // the contacted station's email address
  // email: String,

  // the contacted station's owner's callsign
  // eqCall: String,

  // date QSL received from eQSL.cc (only valid if EQSL_QSL_RCVD is Y, I, or V)(V import-only)
  // eqslQslrdate: Date,

  // date QSL sent to eQSL.cc (only valid if EQSL_QSL_SENT is Y, Q, or I)
  // eqslQslsdate: Date,

  // eQSL.cc QSL received status instead of V (import-only) use <CREDIT_GRANTED:42>CQWAZ:eqsl,CQWAZ_BAND:eqsl,CQWAZ_MODE:eqsl Default Value: N
  // eqslQslRcvd: Enumeration,

  // eQSL.cc QSL sent status Default Value: N
  // eqslQslSent: Enumeration,

  // the contacted station's FISTS CW Club member number with a value greater than 0.
  // fists: PositiveInteger,

  // the contacted station's FISTS CW Club Century Certificate (CC) number with a value greater than 0.
  // fistsCc: PositiveInteger,

  // new EME "initial"
  // forceInit: Boolean,

  // QSO frequency in Megahertz
  freq: optional(number()),

  // in a split frequency QSO, the logging station's receiving frequency in Megahertz
  // freqRx: Number,

  // the contacted station's 2-character, 4-character, 6-character, or 8-character Maidenhead Grid Square
  // gridsquare: GridSquare,

  // import-only: use OPERATOR instead
  // guestOp: String,

  // the date the QSO was last uploaded to the HRDLog.net online service
  // hrdlogQsoUploadDate: Date,

  // the upload status of the QSO on the HRDLog.net online service
  // hrdlogQsoUploadStatus: Enumeration,

  // the contacted station's IOTA designator, in format CC-XXX, where CC is a member of the Continent enumeration XXX is the island group designator, where 1 <= XXX <= 999 [use leading zeroes]
  // iota: IOTARefNo,

  // the contacted station's IOTA Island Identifier, an 8-digit integer in the range 1 to 99999999 [leading zeroes optional]
  // iotaIslandId: PositiveInteger,

  // the contacted station's ITU zone in the range 1 to 90 (inclusive)
  // ituz: PositiveInteger,

  // the geomagnetic K index at the time of the QSO in the range 0 to 9 (inclusive)
  // kIndex: Integer,

  // the contacted station's latitude
  // lat: Location,

  // the contacted station's longitude
  // lon: Location,

  // date QSL received from ARRL Logbook of the World (only valid if LOTW_QSL_RCVD is Y, I, or V)(V import-only)
  // lotwQslrdate: Date,

  // date QSL sent to ARRL Logbook of the World (only valid if LOTW_QSL_SENT is Y, Q, or I)
  // lotwQslsdate: Date,

  // ARRL Logbook of the World QSL received status instead of V (import-only) use <CREDIT_GRANTED:39>DXCC:lotw,DXCC_BAND:lotw,DXCC_MODE:lotw Default Value: N
  // lotwQslRcvd: Enumeration,

  // ARRL Logbook of the World QSL sent status Default Value: N
  // lotwQslSent: Enumeration,

  // maximum length of meteor scatter bursts heard by the logging station, in seconds with a value greater than or equal to 0
  // maxBursts: Number,

  // QSO Mode
  mode: ModeEnum,

  // For Meteor Scatter QSOs, the name of the meteor shower in progress
  // msShower: String,

  // the logging station's antenna
  // myAntenna: String,

  // the logging station's antenna
  // myAntennaIntl: IntlString,

  // the logging station's ARRL section
  // myArrlSect: Enumeration,

  // the logging station's city
  // myCity: String,

  // the logging station's city
  // myCityIntl: IntlString,

  // the logging station's Secondary Administrative Subdivision (e.g. US county, JA Gun), in the specified format
  // myCnty: Enumeration,

  // the logging station's DXCC entity name
  // myCountry: String,

  // the logging station's DXCC entity name
  // myCountryIntl: IntlString,

  // the logging station's CQ Zone in the range 1 to 40 (inclusive)
  // myCqZone: PositiveInteger,

  // the logging station's DXCC Entity Code <MY_DXCC:1>0 means that the logging station is known not to be within a DXCC entity.
  // myDxcc: Enumeration,

  // the logging station's FISTS CW Club member number with a value greater than 0.
  // myFists: PositiveInteger,

  // the logging station's 2-character, 4-character, 6-character, or 8-character Maidenhead Grid Square
  // myGridsquare: GridSquare,

  // the logging station's IOTA designator, in format CC-XXX, where CC is a member of the Continent enumeration XXX is the island group designator, where 1 <= XXX <= 999 [use leading zeroes]
  // myIota: IOTARefNo,

  // the logging station's IOTA Island Identifier, an 8-digit integer in the range 1 to 99999999 [leading zeroes optional]
  // myIotaIslandId: PositiveInteger,

  // the logging station's ITU zone in the range 1 to 90 (inclusive)
  // myItuZone: PositiveInteger,

  // the logging station's latitude
  // myLat: Location,

  // the logging station's longitude
  // myLon: Location,

  // the logging operator's name
  // myName: String,

  // the logging operator's name
  // myNameIntl: IntlString,

  // the logging station's postal code
  // myPostalCode: String,

  // the logging station's postal code
  // myPostalCodeIntl: IntlString,

  // description of the logging station's equipment
  // myRig: String,

  // description of the logging station's equipment
  // myRigIntl: IntlString,

  // special interest activity or event
  mySig: optional(string()),

  // special interest activity or event
  // mySigIntl: IntlString,

  // special interest activity or event information
  mySigInfo: optional(string()),

  // special interest activity or event information
  // mySigInfoIntl: IntlString,

  // the logging station's International SOTA Reference.
  mySotaRef: optional(string()),

  // the code for the logging station's Primary Administrative Subdivision (e.g. US State, JA Island, VE Province)
  // myState: Enumeration,

  // the logging station's street
  // myStreet: String,

  // the logging station's street
  // myStreetIntl: IntlString,

  // two US counties in the case where the logging station is located on a border between two counties, representing counties that the contacted station may claim for the CQ Magazine USA-CA award program. E.g. MA,Franklin:MA,Hampshire
  // myUsacaCounties: SecondarySubdivisionList,

  // two or four adjacent Maidenhead grid locators, each four characters long, representing the logging station's grid squares that the contacted station may claim for the ARRL VUCC award program. E.g. EN98,FM08,EM97,FM07
  // myVuccGrids: GridSquareList,

  // the logging station's WWFF (World Wildlife Flora & Fauna) reference
  // myWwffRef: WWFFRef,

  // the contacted station's operator's name
  // name: String,

  // the contacted station's operator's name
  // nameIntl: IntlString,

  // QSO notes recommended use: information of interest to the logging station's operator
  // notes: MultilineString,

  // QSO notes recommended use: information of interest to the logging station's operator
  // notesIntl: IntlMultilineString,

  // the number of meteor scatter bursts heard by the logging station with a value greater than or equal to 0
  // nrBursts: Integer,

  // the number of meteor scatter pings heard by the logging station with a value greater than or equal to 0
  // nrPings: Integer,

  // the logging operator's callsign if STATION_CALLSIGN is absent, OPERATOR shall be treated as both the logging station's callsign and the logging operator's callsign
  // operator: String,

  // the callsign of the owner of the station used to log the contact (the callsign of the OPERATOR's host) if OWNER_CALLSIGN is absent, STATION_CALLSIGN shall be treated as both the logging station's callsign and the callsign of the owner of the station
  // ownerCallsign: String,

  // the contacted station's WPX prefix
  // pfx: String,

  // contest precedence (e.g. for ARRL Sweepstakes)
  // precedence: String,

  // QSO propagation mode
  // propMode: Enumeration,

  // public encryption key
  // publicKey: String,

  // the date the QSO was last uploaded to the QRZ.COM online service
  // qrzcomQsoUploadDate: Date,

  // the upload status of the QSO on the QRZ.COM online service
  // qrzcomQsoUploadStatus: Enumeration,

  // QSL card message
  // qslmsg: MultilineString,

  // QSL card message
  // qslmsgIntl: IntlMultilineString,

  // QSL received date (only valid if QSL_RCVD is Y, I, or V)(V import-only)
  // qslrdate: Date,

  // QSL sent date (only valid if QSL_SENT is Y, Q, or I)
  // qslsdate: Date,

  // QSL received status instead of V (import-only) use <CREDIT_GRANTED:39>DXCC:card,DXCC_BAND:card,DXCC_MODE:card Default Value: N
  // qslRcvd: Enumeration,

  // if QSL_RCVD is set to 'Y' or 'V', the means by which the QSL was received by the logging station; otherwise, the means by which the logging station requested or intends to request that the QSL be conveyed. (Note: ‘V’ is import-only) use of M (manager) is import-only
  // qslRcvdVia: Enumeration,

  // QSL sent status Default Value: N
  // qslSent: Enumeration,

  // if QSL_SENT is set to 'Y', the means by which the QSL was sent by the logging station; otherwise, the means by which the logging station intends to convey the QSL use of M (manager) is import-only
  // qslSentVia: Enumeration,

  // the contacted station's QSL route
  // qslVia: String,

  // indicates whether the QSO was complete from the perspective of the logging station Y - yes N - no NIL - not heard ? - uncertain
  // qsoComplete: Enumeration,

  // date on which the QSO started
  qsoDate: AdifDate,

  // date on which the QSO ended
  // qsoDateOff: Date,

  // indicates whether the QSO was random or scheduled
  // qsoRandom: Boolean,

  // the contacted station's city
  // qth: String,

  // the contacted station's city
  // qthIntl: IntlString,

  // the contacted station’s WAE or CQ entity contained within a DXCC entity. the value None indicates that the WAE or CQ entity is the DXCC entity in the DXCC field. nothing can be inferred from the absence of the REGION field
  // region: Enumeration,

  // description of the contacted station's equipment
  // rig: MultilineString,

  // description of the contacted station's equipment
  // rigIntl: IntlMultilineString,

  // signal report from the contacted station
  rstRcvd: optional(string()),

  // signal report sent to the contacted station
  rstSent: optional(string()),

  // the contacted station's transmitter power in Watts with a value greater than 0
  // rxPwr: Number,

  // satellite mode
  // satMode: String,

  // name of satellite
  // satName: String,

  // the solar flux at the time of the QSO in the range 0 to 300 (inclusive).
  // sfi: Integer,

  // the name of the contacted station's special activity or interest group
  sig: optional(string()),

  // the name of the contacted station's special activity or interest group
  // sigIntl: IntlString,

  // information associated with the contacted station's activity or interest group
  sigInfo: optional(string()),

  // information associated with the contacted station's activity or interest group
  // sigInfoIntl: IntlString,

  // 'Y' indicates that the contacted station's operator is now a Silent Key.
  // silentKey: Boolean,

  // the contacted station's Straight Key Century Club (SKCC) member information
  // skcc: String,

  // the contacted station's International SOTA Reference.
  sotaRef: optional(string()),

  // contest QSO received serial number with a value greater than or equal to 0
  // srx: Integer,

  // contest QSO received information use Cabrillo format to convey contest information for which ADIF fields are not specified in the event of a conflict between information in a dedicated contest field and this field, information in the dedicated contest field shall prevail
  // srxString: String,

  // the code for the contacted station's Primary Administrative Subdivision (e.g. US State, JA Island, VE Province)
  // state: Enumeration,

  // the logging station's callsign (the callsign used over the air) if STATION_CALLSIGN is absent, OPERATOR shall be treated as both the logging station's callsign and the logging operator's callsign
  stationCallsign: optional(string()),

  // contest QSO transmitted serial number with a value greater than or equal to 0
  // stx: Integer,

  // contest QSO transmitted information use Cabrillo format to convey contest information for which ADIF fields are not specified in the event of a conflict between information in a dedicated contest field and this field, information in the dedicated contest field shall prevail
  // stxString: String,

  // QSO Submode use enumeration values for interoperability
  submode: optional(string()),

  // indicates that the QSO information pertains to an SWL report
  // swl: Boolean,

  // Ten-Ten number with a value greater than 0
  // tenTen: PositiveInteger,

  // HHMM or HHMMSS in UTC in the absence of <QSO_DATE_OFF>, the QSO duration is less than 24 hours. For example, the following is a QSO starting at 14 July 2020 23:55 and finishing at 15 July 2020 01:00: <QSO_DATE:8>20200714 <TIME_ON:4>2355 <TIME_OFF:4>0100
  // timeOff: Time,

  // HHMM or HHMMSS in UTC
  timeOn: AdifTime,

  // the logging station's power in Watts with a value greater than 0
  // txPwr: Number,

  // the contacted station's UKSMG member number with a value greater than 0
  // uksmg: PositiveInteger,

  // two US counties in the case where the contacted station is located on a border between two counties, representing counties credited to the QSO for the CQ Magazine USA-CA award program. E.g. MA,Franklin:MA,Hampshire
  // usacaCounties: SecondarySubdivisionList,

  // import-only: use STATE instead
  // veProv: String,

  // two or four adjacent Maidenhead grid locators, each four characters long, representing the contacted station's grid squares credited to the QSO for the ARRL VUCC award program. E.g. EN98,FM08,EM97,FM07
  // vuccGrids: GridSquareList,

  // the contacted station's URL
  // web: String,

  // the contacted station's WWFF (World Wildlife Flora & Fauna) reference
  // wwffRef: WWFFRef,
});

export type AdifRecord = Infer<typeof AdifRecord>;
