const enumArrays = {
    status: ['ongoing', 'planned', 'finished'],
    season: ['Fall', 'Winter', 'Spring', 'Summer'],
    areaType: ['Freifläche', 'Untersaat', 'Steep Slopes', 'Multiple Areas']
}

const statusColorMapping = {
    planned: "warning-cstm",
    ongoing: "info-cstm",
    finished: "success-cstm"
}

export { enumArrays, statusColorMapping };