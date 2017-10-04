try
{
	if(document.domain.match(/^(.+[.])?(orange|sosh|soshcaraibe)[.]fr$/i) == null)	{
		document.location.href="http://r.orange.fr/r/Oerreur_403";
	} else {
		if(typeof o_idzone != "object")
		{
			o_idzone=new Object();
			o_idzone.set=function(o)
			{
				for(var f in o)
					this[f]=o[f];
			};
		}
		o_idzone.IDZONE_STATUS=0;
		o_idzone.IDZONE_SIGVER=1;
		o_idzone.IDZONE_SIGTTL=149188586291;
		o_idzone.IDENT_FORM_URL="https://r.orange.fr/r/Oid_identification";
		o_idzone.set({
	"ACCESS_NETWORK": "",
	"ACCOUNT_COST_CENTER": null,
	"ACCOUNT_MULTIBAL": false,
	"ACCOUNT_NETWORK": "",
	"ACCOUNT_OPTION_FFMV3": false,
	"ACCOUNT_OPTION_MCS": false,
	"ACCOUNT_OPTION_OCS": false,
	"ACCOUNT_OPTION_OO_MAIL": false,
	"ACCOUNT_OPTION_OO_PIM": false,
	"ACCOUNT_OPTION_ORANGE_OFFICE": false,
	"ACCOUNT_OPTION_QUAD": false,
	"ACCOUNT_OPTION_SPORT": false,
	"ACCOUNT_PRO": false,
	"ACCOUNT_SUBSCRIPTION_TYPE": null,
	"BROWSER_FAMILY": "Firefox",
	"BROWSER_MAJOR": 56,
	"CADAP_VERSION": "21.13.23",
	"COMMON_ZIP_CODE": "",
	"CR7_SIGN": null,
	"CR7_TIME": "1506955539",
	"DEVICE_IS_ROBOT": false,
	"DEVICE_POLARIS": false,
	"DEVICE_TYPE": "desktop",
	"HPIZ_VERSION": "2.49.2",
	"MOBILE_BRAND": "",
	"MOBILE_COMMERCIAL_SEGMENT": "",
	"MOBILE_MODEL": "",
	"MOBILE_NETWORK_TYPE": "",
	"MOBILE_OFFER_TYPE": "",
	"NETWORK_COUNTRY_CODE": "FR",
	"NETWORK_ISP_NAME": "Orange",
	"NETWORK_POOL": "",
	"NETWORK_TYPE": "",
	"OS_FAMILY": "Windows",
	"OS_MAJOR": 7,
	"PUBPERSO_VAR1": null,
	"PUBPERSO_VAR2": null,
	"PUBPERSO_VAR3": "",
	"PUBPERSO_VAR4": "",
	"PUBPERSO_VAR5": false,
	"PUBPERSO_VAR6": "",
	"TECH_NET_INDICS": "FETCHED",
	"TECH_NET_STATUS": 1,
	"TECH_PNS_INDICS": "FETCHED",
	"TECH_PNS_REQDUR": 0,
	"TECH_PNS_REQSTS": 0,
	"TECH_PNS_STATUS": 1,
	"TECH_SIG_SIGTTL": 149188586291,
	"TECH_SIG_SIGVER": 1,
	"TECH_SIG_STATUS": 0,
	"TECH_WSP_INDICS": "FETCHED",
	"TECH_WSP_REQDUR": 0,
	"TECH_WSP_REQSTS": 412,
	"TECH_WSP_STATUS": 1,
	"UAF_VERSION": "0.2.0",
	"USER_AVATAR_TINY_PICTURE_URL": "",
	"USER_BIMOBILE_TAGPRO": false,
	"USER_BIRTHDAY": null,
	"USER_CITY_NAME": "",
	"USER_DEFINED_MSISDN": "",
	"USER_EXTERNAL_ID_HASH": null,
	"USER_FBN_MIGRATION_DAY": "",
	"USER_FBN_NEW_CLIENT": false,
	"USER_FIRST_NAME": "",
	"USER_FULL_NAME": "",
	"USER_GENDER": null,
	"USER_HOMELIVE_STATUS": null,
	"USER_IDENT_CONTEXT": null,
	"USER_IDENT_LEVEL": "NONE",
	"USER_IDENT_METHOD": 0,
	"USER_IDENT_TYPE": "",
	"USER_IN8_ALT_SITE": false,
	"USER_IN8_SWITCHED": false,
	"USER_ISIN_PREFS": "",
	"USER_IS_FUT": 0,
	"USER_LAST_NAME": "",
	"USER_M6": false,
	"USER_MAIL_ADDRESS": "",
	"USER_MAIL_NB": null,
	"USER_MAIL_STATUS": 0,
	"USER_METEO_CITIES_DATA": "",
	"USER_MMS_NB": 0,
	"USER_MSISDN": "",
	"USER_OOPS_APP": null,
	"USER_OPEN": 0,
	"USER_OPTION_TV_FIBRE": false,
	"USER_OPTION_TV_SAT": false,
	"USER_OPTION_TV_SAT_DOM": false,
	"USER_OPTION_TV_XDSL": false,
	"USER_OPTION_TV_ZNE": false,
	"USER_OPTION_TV_ZNE_DUO": false,
	"USER_OPTOUT_MERGER": null,
	"USER_ORANGE_CARAIBE_CONVERGENT": false,
	"USER_ORANGE_CARAIBE_MOBILE": false,
	"USER_ORANGE_CARAIBE_SOSH": false,
	"USER_OSDAT_EXTRA": "",
	"USER_OSDAT_VAR1": null,
	"USER_OSDAT_VAR2": null,
	"USER_OSDAT_VAR3": null,
	"USER_OSDAT_VAR4": null,
	"USER_OSDAT_VAR5": null,
	"USER_OSDAT_VAR6": null,
	"USER_PPERSO_STATUS": null,
	"USER_PRINCIPAL": false,
	"USER_PRO": false,
	"USER_QMSISDN": "",
	"USER_QUAD": 0,
	"USER_SMS_NB": 0,
	"USER_SOSH": false,
	"USER_SPUP_ALERT": null,
	"USER_SPUP_PSEUDO_COUNT": null,
	"USER_SPUP_PSEUDO_NAME": "",
	"USER_ZIP_CODE": ""
}
);
	}
}
catch(e)
{
}
