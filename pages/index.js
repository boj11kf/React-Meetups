
import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A 1st Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some adddress 5, 12345 Some City",
    description: "This is a first meetup4",
  },
  {
    id: "m2",
    title: "A 2nd Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some adddress 5, 12345 Some City",
    description: "This is a second meetup4",
  },
  {
    id: "m3",
    title: "A 3rd Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some adddress 5, 12345 Some City",
    description: "This is a third meetup4",
  },
];

const HomePage = (props) => {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

/* 
  getStaticProps() és getServerSideProps():
  Mind a 2-nk akkor lehet elgondolkodni, ha a komponensünknek
  adatra van szüksége.

  Az hogy melyiket választjuk, függ attól, hogy az adat
  amire használjuk, milyen gyosan módosulhat vagy hogy
  az adat eléréshez szükség van-e request (req) object-re

*/

/* 
  getStaticProps():
  Előre lefoglalt, beépített fggv.
  A pre-rendering procecc alatt, ha szüsksége van erre,
  akkor futtatja.
  Ilyet máshol nem lehet implementálni, csak a pages
  mappa alatt lévő index.js file-okba
  Amit ebbe a függvnybe teszünk, az sosem fog lefutni a 
  kliens oldalon. 
  Olyan adatok fetchelésére használatos, amik inicializálás
  érdekében a szerver oldalon már meg kell történjen.
  Csak a build process alatt fut le.
  Mindig object-el tér vissza. A visszatérési érték jelen 
  esetben props, azért props mert a HomePage = (props) => {}
  is. Ha itt mást adunk meg, akkor a komponensben is másképp
  lesz majd elérhető

  revalidate: (update frequency in seconds)
  Ha egy oldal nem statikus, hanem adatok módosulhatnak rajta
  ez nem csak a build alatt generál egy úg oldalt, hanem a 
  későbbiekben legalább 10 sec-enként a szerveren is, ha érkeznek 
  felé kérések. Tehát biztosak lehetünk benne, hogy a rerendered
  page adatai nem régebbiek 10 sec-nél
*/

export const getStaticProps = async () => {
  // fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  };
}

/* 
  getServerSideProps():
  Előre lefoglalt, beépített fggv.
  A build process alatt nem fut le, viszont a szerveren 
  mindig lefut a deployement után.
  Itt nincs értelme a revalidate-nek, mert szerveroldalon
  amúgy is módosul, aminek módosulnia kell, 
  amint érkezik egy request

*/
/* 
export const getServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;

  // fetch data from API

  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  };
}
 */
export default HomePage;
