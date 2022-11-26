import React from "react";

const ContactUs = () => {
  return (
    <div className="px-4 py-7 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pb-20">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div className="lg:pr-10">
          <h5 className="mb-4 text-4xl font-extrabold leading-none">
            Our Gear Experts are
            <br className="hidden md:block" />
            <span className="inline-block text-deep-purple-accent-400">
              here to help
            </span>
          </h5>
          <p className="mb-6 text-gray-900">
            Our Gear Experts are here to help you with every aspect of buying
            and selling used camera equipment. Whether making a new purchase,
            trading up, or looking to turn old gear into cash, we're here to
            answer your questions, give you the best advice, and even help place
            your order.
          </p>

          <button className="btn btn-primary">Contact Us</button>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src="https://i.ibb.co/n3tzJfH/gear-experts-large-min.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
