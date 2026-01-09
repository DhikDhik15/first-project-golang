export const formatDateID = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};
