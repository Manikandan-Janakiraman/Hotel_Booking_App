import { Check } from "lucide-react";

const Amenities = () => {
  return (
    <div className="p-5">
      <div className="bg-white rounded-xl">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* COLUMN 1 */}
          <div>
            <Section title="Great for your stay">
              <Item text="Free WiFi" />
              <Item text="Air conditioning" />
              <Item text="Private bathroom" />
              <Item text="View" />
              <Item text="Flat-screen TV" />
              <Item text="Room service" />
              <Item text="Family rooms" />
              <Item text="Bath or shower" />
              <Item text="Luggage storage" />
              <Item text="Cable channels" />
            </Section>

            <Section title="Bathroom">
              <Item text="Towels" />
              <Item text="Bath or shower" />
              <Item text="Private bathroom" />
              <Item text="Toilet" />
              <Item text="Free toiletries" />
            </Section>

            <Section title="Bedroom">
              <Item text="Linen" />
              <Item text="Wardrobe or closet" />
            </Section>
          </div>

          {/* COLUMN 2 */}
          <div>
            <Section title="View">
              <Item text="View" />
            </Section>

            <Section title="Kitchen">
              <Item text="Cleaning products" />
            </Section>

            <Section title="Room amenities">
              <Item text="Socket near the bed" />
              <Item text="Clothes rack" />
            </Section>

            <Section title="Living Area">
              <Item text="Seating Area" />
              <Item text="Desk" />
            </Section>

            <Section title="Media & Technology">
              <Item text="Flat-screen TV" />
              <Item text="Cable channels" />
              <Item text="Satellite channels" />
              <Item text="Telephone" />
              <Item text="TV" />
            </Section>

            <Section title="Internet">
              <p className="text-sm text-gray-600">
                WiFi is available in all areas and is free of charge.
              </p>
            </Section>
          </div>

          {/* COLUMN 3 */}
          <div>
            <Section title="Parking">
              <p className="text-sm text-gray-600">No parking available.</p>
            </Section>

            <Section title="Services">
              <Item text="Daily housekeeping" />
              <Item text="Luggage storage" />
              <Item text="Wake-up service" />
              <Item text="24-hour front desk" />
              <Item text="Room service" />
            </Section>

            <Section title="Safety & security">
              <Item text="Fire extinguishers" />
              <Item text="CCTV in common areas" />
              <Item text="Key card access" />
              <Item text="Key access" />
            </Section>

            <Section title="General">
              <Item text="Air conditioning" />
              <Item text="Tile/marble floor" />
              <Item text="Fan" />
              <Item text="Family rooms" />
            </Section>

            <Section title="Languages Spoken">
              <Item text="English" />
              <Item text="Hindi" />
            </Section>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Item = ({ text }) => (
  <div className="flex items-start gap-2 text-sm text-gray-700">
    <Check size={16} className="text-black mt-1" />
    <span>{text}</span>
  </div>
);

export default Amenities;
