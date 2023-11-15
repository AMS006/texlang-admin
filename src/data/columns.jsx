import dayjs from "dayjs"
import UpdateWorkButton from "../components/common/UpdateWorkButton"
import UploadButton from "../components/common/UploadButton"
import CheckBox from "../components/common/CheckBox"
import { Link } from "react-router-dom"

export const downloadFilesColumns = [
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
        accessor: 'lang',
        Cell: (info) => {
            return <span className="capitalize">{info.value}</span>
        }
    },
    {
        Header: 'Upload',
        Cell: (info) => {
            return <UploadButton data={info.row.original} idx={info.row.index} />
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
        Header: "Invoice No.",
        accessor: "invoiceNumber",
        Cell: (info) => {
            return <Link to={`/Enterprise/invoice/${info.row.original.id}`} className="text-blue-500 hover:underline">{info.value}</Link>
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
        accessor: "hscSac",
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
