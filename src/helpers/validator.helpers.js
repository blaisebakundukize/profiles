export function simpleProfileValidator(profile) {
  const errors = [];

  // simple NID validation
  if (
    !Number(profile.nid) ||
    profile.nid > 1202199999999999 ||
    profile.nid < 1198000000000000
  ) {
    errors.push({ field: 'nid', error: 'Nid is invalid' });
  }

  // simple Phone_number validation
  if (profile.phone_number.match(/\d/g).length !== 10) {
    errors.push({
      field: 'phone_number',
      error: 'Phone number is incorrect',
    });
  }

  return JSON.stringify(errors);
}
