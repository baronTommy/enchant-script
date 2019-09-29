import path from 'path';

// eslint-disable-next-line
export const bL = (cnt = 1) => {
  for (var j = 0; j < cnt; j++) {
    console.log('');
  }
};

export const notificationOpt = ({
  message,
  title,
}: {
  message: string;
  title: string;
}) => ({
  title,
  message,
  icon: path.join(__dirname, 'coulson.jpg'),
  sound: true,
});

export class CustomError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customeData: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...p: any) {
    super(...p);

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    // eslint-disable-next-line prefer-destructuring
    this.customeData = p[0];
  }
}
