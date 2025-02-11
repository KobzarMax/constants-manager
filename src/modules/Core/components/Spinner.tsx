import { FC } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Spinner: FC = () => {
  return (
    <div
      className={`absolute bg-white opacity-50 z-10 top-0 right-0 bottom-0 left-0 w-screen max-w-full h-screen flex items-center justify-center`}
    >
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};
