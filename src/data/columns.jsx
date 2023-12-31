import dayjs from "dayjs"
import UpdateWorkButton from "../components/common/UpdateWorkButton"
import UploadButton from "../components/common/UploadButton"
import CheckBox from "../components/common/CheckBox"
import { Link } from "react-router-dom"
import InvoiceCancelButton from "../components/common/InvoiceCancelButton"
import ReAssignTranslatorButton from "../components/common/ReAssignTranslatorButton"

export const downloadFilesColumns = [
    {
        Header: 'File Name',
        accessor: 'fileName'
    },
    {
        Header: 'Source Language',
        accessor: 'sourceLanguage',
        Cell: (row) => {
            return <span className="capitalize">{row.value}</span>
        }
    },
    {
        Header: 'Download',
        accessor: 'downloadUrl',
        Cell: (row) => {
            return <a href={row.value} download className="text-blue-500 hover:underline">Download</a>
        }
    }
]

export const uploadFilesColumns = [
    {
        Header: 'Target Language',
        accessor: 'targetLanguage',
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: 'Upload',
        accessor: 'id',
        Cell: (info) => {
            return <UploadButton id={info.value} workId={info?.row?.original?.workId} />
        }
    }
]

export const updateWorksColumn = [
    {
        Header: 'File Name',
        accessor: 'name',
        Cell: (row) => {
            return <span className="capitalize">{row.value}</span>
        }
    },
    {
        Header: 'Job Type',
        accessor: 'jobType',
        Cell: (row) => {
            return <span className="capitalize">{row.value}</span>
        }
    },
    {
        Header: 'Cost',
        accessor: 'cost',
        Cell: (row) => {
            return <span>{Number(row.value).toFixed(2)}</span>
        }
    },
    {
        Header: 'Word Count',
        accessor: 'wordCount',
        Cell: (row) => {
            return <span>{row.value}</span>
        }
    },
    {
        Header: 'Action',
        accessor: 'id',
        Cell: (row) => {
            return <UpdateWorkButton work={row.row.original} />
        }
    }
]

export const paymentPendingProjectColumn = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'Project Name',
        accessor: 'name',

    },
    {
        Header: 'User',
        accessor: 'user',

    },
    {
        Header: 'Date of Creation',
        accessor: 'createdAt',
        Cell: (row) => {
            return <span>{dayjs(row?.value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: 'Word Count',
        accessor: 'wordCount',
        Cell: (row) => {
            return <span>{row?.value}</span>
        }
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        Cell: (row) => {
            return <span>{Number(row?.value).toFixed(2)}</span>
        }
    },
    {
        Header: 'Number of Languages',
        accessor: 'numberOfLanguages',
        Cell: (row) => {
            return <span>{row?.value}</span>
        }
    }
]

export const updatePaidProjectColumn = [
    {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
            <CheckBox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
            <CheckBox {...row.getToggleRowSelectedProps()} />
        ),
    },
    {
        Header: 'Project Name',
        accessor: 'name',
    },
    {
        Header: 'User',
        accessor: 'user',
    },
    {
        Header: 'Date of Creation',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: 'Word Count',
        accessor: 'wordCount',
        Cell: ({ value }) => {
            return <span>{value}</span>
        }
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => {
            return <span>{Number(value).toFixed(2)}</span>
        }
    },
    {
        Header: 'Number of Languages',
        accessor: 'numberOfLanguages',
        Cell: ({ value }) => {
            return <span>{value}</span>
        }
    }
];

export const companyBillingColumn = [
    {
        Header: "Customer Id",
        accessor: "customerId",

    },
    {
        Header: "Date of Creation",
        accessor: "createdAt",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Project Name",
        accessor: "projectName",
    },
    {
        Header: "WordCount",
        accessor: 'wordCount',
    },
    {
        Header: "No. of Languages",
        accessor: "numberOfLanguages",
    },
    {
        Header: "Languages & Rate",
        accessor: "languageRates",
        Cell: (info) => {
            return <div>
                {
                    info.value.map((rate, idx) => {
                        return <div key={idx}>
                            <span className="capitalize">{rate.lang}</span> - {Number(rate.rate).toFixed(2)}
                        </div>
                    })
                }
            </div>
        }
    },
    {
        Header: "File Name",
        accessor: "fileName",
    }
]

export const generateInvoiceTableColumn = [
    {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
            <CheckBox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
            <CheckBox {...row.getToggleRowSelectedProps()} />
        ),
    },
    {
        Header: "Project Name",
        accessor: "projectName",
    },
    {
        Header: "User",
        accessor: "customerId",

    },
    {
        Header: "File Name",
        accessor: "fileName"
    },
    {
        Header: "Date of Creation",
        accessor: "createdAt",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Source Language",
        accessor: "sourceLanguage",
        Cell: (row) => {
            return <span className="capitalize">{row.value}</span>
        }
    },
    {
        Header: "Target Language",
        accessor: "targetLanguage",
        Cell: (row) => {
            return <span className="capitalize">{row.value}</span>
        }
    },
    {
        Header: "Cost",
        accessor: "cost",
        Cell: (row) => {
            return <span>{Number(row.value).toFixed(2)}</span>
        }
    },
    {
        Header: "WordCount",
        accessor: 'wordCount',
    },
    {
        Header: "Amount",
        accessor: "amount",
        Cell: (row) => {
            return <span>{Number(row.value).toFixed(2)}</span>
        }
    }
]

export const approvePendingInvoiceColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "Refrence No.",
        accessor: "refrenceNumber",
        Cell: (info) => {
            return <Link to={`/Enterprise/InvoiceApprove/${info.row.original.id}`} className="text-blue-500 hover:underline">{info.value}</Link>
        }
    },
    {
        Header: "Invoice No.",
        accessor: "invoiceNumber",
    },
    {
        Header: "Invoice Date",
        accessor: "invoiceDate",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Company Name",
        accessor: "companyName"
    }
]

export const invoiceServiceColumn = [
    {
        Header: "Service Name",
        Cell: () => (
            <div className="flex items-start flex-col gap-0.5">
                <h2 className="font-semibold">Content Localization/Translational Charges</h2>
                <p className="text-sm">Translation/Transilteration of Word or Content uploaded on Texlang Portal</p>
            </div>
        ),
    },
    {
        Header: "Total Units",
        accessor: "wordCount",

    },
    {
        Header: "Amount",
        accessor: "amount"
    }
]

export const invoiceTaxDetailColumn = [
    {
        Header: "HSC/SAC",
        accessor: "hscCode",
    },
    {
        Header: "Taxable Value",
        accessor: "amount",
    },
    {
        Header: "Central Tax",
        columns: [
            {
                Header: "Rate",
                accessor: "centralTaxRate",
                Cell: (info) => {
                    return <span>{info.value}%</span>
                }
            },
            {
                Header: "Amount",
                accessor: "centralTaxAmount",
            },
        ],
    },
    {
        Header: "State Tax",
        columns: [
            {
                Header: "Rate",
                accessor: "stateTaxRate",
                Cell: (info) => {
                    return <span>{info.value}%</span>
                }
            },
            {
                Header: "Amount",
                accessor: "stateTaxAmount",
            },
        ],
    },
    {
        Header: "Total Tax Amount",
        accessor: "totalTaxAmount",
    },
];

export const allInvoicesStatusColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "Refrence No.",
        accessor: "refrenceNumber",
        Cell: (info) => {
            return <Link to={`/Enterprise/InvoiceDetails/${info.row.original.id}`} className="text-blue-500 hover:underline">{info.value}</Link>
        }
    },
    {
        Header: "Invoice No.",
        accessor: "invoiceNumber",
    },
    {
        Header: "Invoice Date",
        accessor: "createdAt",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Company Name",
        accessor: "companyName"
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Cancel",
        accessor: "id",
        Cell: (info) => {
            if (info.row.original.status !== 'Cancelled')
                return <InvoiceCancelButton id={info.value} />
        }
    }
]
export const companyApprovePendingInvoicesColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "Refrence No.",
        accessor: "refrenceNumber",
        Cell: (info) => {
            return <Link to={`/Invoice/InvoiceDetails/${info.row.original.id}`} className="text-blue-500 hover:underline">{info.value}</Link>
        }
    },
    {
        Header: "Invoice Date",
        accessor: "invoiceDate",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Company Name",
        accessor: "companyName"
    },

]

export const invoicesToSendColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "Invoice No.",
        accessor: "invoiceNumber",
        Cell: (info) => {
            return <Link to={`/Enterprise/InvoiceToSendDetails/${info.row.original.id}`} className="text-blue-500 hover:underline">{info.value}</Link>
        }
    },
    {
        Header: "Invoice Date",
        accessor: "invoiceDate",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Company Name",
        accessor: "companyName"
    },
]

export const contractDetailColumn = [
    {
        Header: "From Date",
        accessor: "fromDate",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "To Date",
        accessor: "toDate",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Is Active",
        accessor: "isActive",
        Cell: ({ value }) => {
            return <span>{value ? 'Active' : 'Not Active'}</span>
        }
    },
    {
        Header: "Total Consumption Units",
        accessor: "totalConsumptionUnits"
    },
    {
        Header: "Used Units",
        accessor: "userUnits"
    }
]

export const translatorsColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "Translator Name",
        accessor: "name",
        Cell: (info) => {
            return <Link to={`/Enterprise/TranslatorDetails/${info.row.original.id}`} className="text-blue-500 hover:underline">{info.value}</Link>
        }
    },
    {
        Header: "Translator Email",
        accessor: "email",
    },
    {
        Header: "Contact No.",
        accessor: "contact",
    },
    {
        Header: "Status",
        accessor: "status",
    },
]

export const notAssignedWorksColumn = [
    {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
            <CheckBox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
            <CheckBox {...row.getToggleRowSelectedProps()} />
        ),
    },
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "File Name",
        accessor: "fileName",

    },
    {
        Header: "Source Language",
        accessor: "sourceLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Target Language",
        accessor: "targetLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Word Count",
        accessor: "wordCount",
        Cell: (info) => {
            return <span>{info.value}</span>
        }
    },
    {
        Header: "Job Type",
        accessor: "jobType",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
]

export const translatorLanguageColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "Source Language",
        accessor: "sourceLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Target Language",
        accessor: "targetLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
]

export const translatorWorksColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "File Name",
        accessor: "fileName",

    },
    {
        Header: "Project Name",
        accessor: "projectName"
    },
    {
        Header: "Source Language",
        accessor: "sourceLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Target Language",
        accessor: "targetLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Word Count",
        accessor: "wordCount",
        Cell: (info) => {
            return <span>{info.value}</span>
        }
    },
    {
        Header: "Assigned Date",
        accessor: "assignedOn",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Status",
        accessor: "status",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
]

export const reAssignTranslatorColumn = [
    {
        Header: "Sr. No.",
        accessor: (row, idx) => idx + 1
    },
    {
        Header: "File Name",
        accessor: "fileName",

    },
    {
        Header: "Project Name",
        accessor: "projectName"
    },
    {
        Header: "Source Language",
        accessor: "sourceLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Target Language",
        accessor: "targetLanguage",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Word Count",
        accessor: "wordCount",
        Cell: (info) => {
            return <span>{info.value}</span>
        }
    },
    {
        Header: "Translator Name",
        accessor: "translatorName",
    },
    {
        Header: "Assigned Date",
        accessor: "assignedOn",
        Cell: ({ value }) => {
            return <span>{dayjs(value).format('M/DD/YYYY')}</span>
        }
    },
    {
        Header: "Status",
        accessor: "status",
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: "Action",
        Cell: (info) => {
            return <ReAssignTranslatorButton work={info.row.original} />
        }

    }
]


