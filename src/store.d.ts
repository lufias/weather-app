declare module '../store' {
  const store: {
    dispatch: (type: string, payload?: any) => Promise<any>;
  };
  export default store;
} 