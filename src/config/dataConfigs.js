const enumArrays = {
    status: ['ongoing', 'planned', 'finished'],
    season: ['Fall', 'Winter', 'Spring', 'Summer']
}

const statusColorMapping = {
    planned: "warning-cstm",
    ongoing: "info-cstm",
    finished: "success-cstm"
}

export { enumArrays, statusColorMapping };