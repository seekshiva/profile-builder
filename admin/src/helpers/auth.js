import firebase from 'firebase';
import { ref, firebaseAuth } from '../config/Fire';

export function auth(email, pw) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveEmailUser);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveEmailUser(user) {
  var userAuth = firebaseAuth().currentUser;

  return ref
    .child(`users/${user.uid}/`)
    .set({
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
    })
    .then(() => {
      var user = firebaseAuth().currentUser;

      user.sendEmailVerification().then(
        function() {
          // Email sent.
          console.log('email sent');
        },
        function(error) {
          // An error happened.
        }
      );
    });
}

// Forms for profile
export function saveUsername(Username, user) {
  const uid = firebaseAuth().currentUser.uid;
  console.log(uid);
  const updates = {};
  const CurrentUserName = `users/${uid}/username`;

  const unRef = ref.child(`usernames/${Username}/`);
  return unRef.once('value').then(Name => {
    const targetUID = Name.val();
    if (!targetUID) {
      // no user exist with this username
      // I need to remove existing username record from /usernames
      // and I need to check if the new entry already have it and allow to write only if not

      updates[`users/${uid}/username`] = Username;
      updates[`users/${uid}/SignupOn`] =
        firebase.database.ServerValue.TIMESTAMP;
      updates[`usernames/${Username}`] = uid;

      return ref.child(CurrentUserName).once('value').then(function(Name) {
        const CurrentUserNameVal = Name.val();
        const CurrentUserNamePath = `usernames/${CurrentUserNameVal}`;

        console.log(CurrentUserNamePath);

        return ref.child(CurrentUserNamePath).set(null).then(() => {
          console.log('Current username deleted and procedd to save new name');
          return ref.child('/').update(updates).then(() => {
            console.log('user name saved successfully');
          });
        });
      });
    } else if (targetUID !== uid) {
      // throw error that some other user has this username
      console.error('throw error that some other user has this username');
    } else {
      // You already own this username. No need to submit.
      console.error('You already own this username. No need to submit.');
    }
  });

  // return ref.child(CurrentUserName).once('value').then(function(Name) {
  //   const CurrentUserNameVal = Name.val();
  //   const isExist = `usernames/${CurrentUserNameVal}`;
  //   if (isExist.exists()) {
  //     console.log('exists true');
  //   } else {
  //     console.log('exists false');
  //   }
  //   console.log(CurrentUserName, CurrentUserNameVal, isExist);
  // });

  // return ref.child('/').update(updates).then(() => {
  //   console.log('user name saved successfully');
  // });
}

export function saveName(name) {
  const uid = firebaseAuth().currentUser.uid;
  const updates = {};

  updates['name'] = name;

  return ref.child(`/profiles/${uid}/`).update(updates).then(() => {
    console.log('Name successfully saved');
  });
}
export function saveWho(who) {
  const uid = firebaseAuth().currentUser.uid;
  const updates = {};

  updates[`profiles/${uid}/who`] = who;
  updates['global/who'] = who;

  return ref.child(`/`).update(updates).then(() => {
    console.log('Who successfully saved');
  });
}
export function saveShortDesc(shortDesc) {
  const uid = firebaseAuth().currentUser.uid;
  const updates = {};

  updates['shortDesc'] = shortDesc;

  return ref.child(`/profiles/${uid}/`).update(updates).then(() => {
    console.log('Who successfully saved');
  });
}
export function saveContact(
  email,
  phone,
  angellist,
  behance,
  blogger,
  dribbble,
  etsy,
  facebook,
  fitbit,
  fiverr,
  flickr,
  foursquare,
  github,
  gofundme,
  goodreads,
  Highbrow,
  imdb,
  indiegogo,
  instagram,
  kickstarter,
  lastfm,
  linkedin,
  medium,
  pinterest,
  pocket,
  producthunt,
  quora,
  reddit,
  skillshare,
  slideshare,
  snapchat,
  soundcloud,
  spotify,
  stackoverflow,
  strava,
  tumblr,
  twitch,
  twitter,
  upwork,
  vk,
  vsco,
  vimeo,
  vine,
  weibo,
  wikipedia,
  wordpress,
  xing,
  yelp,
  fivehundredpx,
  care,
  google
) {
  const uid = firebaseAuth().currentUser.uid;
  const updates = {};

  updates['email'] = email;
  updates['phone'] = phone;
  updates['angellist'] = angellist;
  updates['behance'] = behance;
  updates['blogger'] = blogger;
  updates['dribbble'] = dribbble;
  updates['etsy'] = etsy;
  updates['facebook'] = facebook;
  updates['fitbit'] = fitbit;
  updates['fiverr'] = fiverr;
  updates['flickr'] = flickr;
  updates['foursquare'] = foursquare;
  updates['github'] = github;
  updates['gofundme'] = gofundme;
  updates['goodreads'] = goodreads;
  updates['Highbrow'] = Highbrow;
  updates['imdb'] = imdb;
  updates['indiegogo'] = indiegogo;
  updates['instagram'] = instagram;
  updates['kickstarter'] = kickstarter;
  updates['lastfm'] = lastfm;
  updates['linkedin'] = linkedin;
  updates['medium'] = medium;
  updates['pinterest'] = pinterest;
  updates['pocket'] = pocket;
  updates['producthunt'] = producthunt;
  updates['quora'] = quora;
  updates['reddit'] = reddit;
  updates['skillshare'] = skillshare;
  updates['slideshare'] = slideshare;
  updates['snapchat'] = snapchat;
  updates['soundcloud'] = soundcloud;
  updates['spotify'] = spotify;
  updates['stackoverflow'] = stackoverflow;
  updates['strava'] = strava;
  updates['tumblr'] = tumblr;
  updates['twitch'] = twitch;
  updates['twitter'] = twitter;
  updates['upwork'] = upwork;
  updates['vk'] = vk;
  updates['vsco'] = vsco;
  updates['vimeo'] = vimeo;
  updates['vine'] = vine;
  updates['weibo'] = weibo;
  updates['wikipedia'] = wikipedia;
  updates['wordpress'] = wordpress;
  updates['xing'] = xing;
  updates['yelp'] = yelp;
  updates['fivehundredpx'] = fivehundredpx;
  updates['care'] = care;
  updates['google'] = google;

  return ref.child(`/profiles/${uid}/contact`).update(updates).then(() => {
    console.log('Who successfully saved');
  });
}

export function saveStory(story) {
  const uid = firebaseAuth().currentUser.uid;
  const updates = {};

  updates['story'] = story;

  return ref.child(`/profiles/${uid}/`).update(updates).then(() => {
    console.log('Who successfully saved');
  });
}

export function saveTheme(ThemeColor) {
  const uid = firebaseAuth().currentUser.uid;
  const updates = {};

  updates[`profiles/${uid}/themeColor`] = ThemeColor;

  return ref.child(`/`).update(updates).then(() => {
    console.log('Who successfully saved');
  });
}
