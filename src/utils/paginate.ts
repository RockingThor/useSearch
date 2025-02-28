interface PaginateOptions {
  page?: number;
  pageSize?: number;
}

export function paginate(options: PaginateOptions) {
  const { page = 1, pageSize = 10 } = options;

  return (data: any[], query: string) => {
    // Query is not used here; it's only for compatibility with our hook.
    const startIndex = (page - 1) * pageSize;

    return data.slice(startIndex, startIndex + pageSize);
  };
}
