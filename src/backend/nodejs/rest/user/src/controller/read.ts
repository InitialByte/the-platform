export const readController = (_, res): void => {
  res.status(200).json({
    data: 'it works',
  });
};
