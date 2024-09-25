import MeetupDetail from "@/components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </>
  );
};

/* 
  getStaticPaths():
  Tegyük fel, hogy van egy projektünk, ami (akár async) 
  API lekérdezésekkel inicializálódik a build process alatt. 
  Teszi ezt pl egy getStaticProps() fggv-el.
  !! Tehát ezek nem a felhasználói action-ok miatt generálódnak újra!!

  Halad végig a process, készülnek el a static, és dynamic
  oldalak, komponensek.

  A MeetupDetails() a mappaszerkezetből látszik ([meetupdId])
  hogy dinamikus oldalról van szó, elkészült a sablonjuk, 
  de van egy getStaticProps(), amitől új URL-t új adatokat kapott
  a komponens. És mivel A felhasználó valószínűleg el szerente
  valamikor oda jutni, ezekel az adatokkal újra le kell generálni.
  De mindezt a build process alatt. Mint egy key-value pair ([meetupId])
  legeneráljuk a fetchből érkező adatok alapján, a szükséges 
  mappaszerkezetet, amiből aztán tud dolgozni a nexJS.

  Ennek a dinamikusan elkészítendő mappaszerkezetnek, a segítségére
  van a getStaticPaths(). 
  Itt ez most dummy módon beégetett adatokkal van,
  valós életben ide fetcheléssel kérjük le egy DB-ből,
  vagy API-ról és generáljuk le dynamikusan.

  fallback:
  Megmondja, hogy a paths array, minden támogatott értéket
  tartalamz, vagy csak egy részét.
  false: mindent
  true: csak egy részét
  Ez jelen esetben azt jelenti, hogy van m1, m2-nk és ha
  false, és a felhasznalo URL-be egy m3-at ír, akkor 404 errort kap
  ha true, akkor a nexJS megpróbál generálni szerver oldalon
  egy oldalt m3 id-val.
  Ez egy jó feature, mert tudsz megadni beégetett adatokat is
  azon oldalakra amellyek a leglátogatottabbak (m1, m2) és dinamikusan
  pedig megengedni legenerálni azokat amelyek egyelőre hiányoznak.

*/

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
};

/* 
  getStaticProps(): 
  lsd pages dir, index.js
  context: 
  nem csak a getServerSideProps()-nál létezik, itt is
  csak nem a request response nyerhető ki belőle, hanem
  a params scope-ból a pages dirr alatti [meetupId] dir
  aktuális értéke.


*/

export const getStaticProps = async (context) => {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  return {
    props: {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg",
      id: meetupId,
      title: "A First Meetup",
      address: "Some Street 5, Some City",
      description: "The meetup description",
    },
  };
};

export default MeetupDetails;
