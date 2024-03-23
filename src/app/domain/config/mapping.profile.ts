import { MappingPair, Profile } from '@dynamic-mapper/mapper';
import {
  HttpMessage,
  HttpMessageDto,
  PageResponse,
  RawValue,
  UserAccessCredentials,
  UserPrincipal,
} from '../../shared';
import { ListOption } from '../../form-components';
import {
  AccountEvent,
  AccountEventDto,
  AddUser,
  AdminUser,
  AdminUserAccount,
  AdminUserAccountDto,
  AdminUserAddress,
  AdminUserAddressDto,
  AdminUserDto,
  Country,
  CountryDto,
  CryptoCurrency,
  CryptoCurrencyDto,
  Currency,
  CurrencyDto,
  CurrencyExchangeRate,
  CurrencyExchangeRateDataDto,
  CurrencyExchangeRateDto,
  CurrencyPair,
  CurrencyPairDto,
  CurrencyQuote,
  CurrencyTransaction,
  CurrencyTransactionDto,
  LoginDto,
  LoginResponse,
  PasswordResetToken,
  PasswordResetTokenDto,
  PasswordTokenUser,
  PasswordTokenUserDto,
  Payment,
  PaymentDto,
  PaymentMethod,
  PaymentMethodDto,
  RegisterAccountRequest,
  RegisterAddressRequest,
  RegisterPreferenceRequest,
  RegisterRequest,
  User,
  UserAccountEvent,
  UserAccountEventDto,
  UserAccountRequest,
  UserAddressRequest,
  UserDto,
  UserPreferenceRequest,
  UserProfile,
  UserProfileAddress,
  UserProfileAddressDto,
  UserProfileDto,
  UserProfilePreference,
  UserProfilePreferenceDto,
  UserRole,
  UserRoleDto,
  Wallet,
  WalletDto,
} from '../models';
import { FormGroup } from '@angular/forms';
import { AccountForm, AddressForm, PersonalInformationForm, PreferenceForm } from '../components';

export class MappingProfile extends Profile {
  public static readonly HttpMessageDtoToHttpMessage = new MappingPair<
    HttpMessageDto,
    HttpMessage
  >();

  public static readonly AccountEventDtoToAccountEvent = new MappingPair<
    AccountEventDto,
    AccountEvent
  >();
  public static readonly UserAccountEventDtoToUserAccountEvent = new MappingPair<
    UserAccountEventDto,
    UserAccountEvent
  >();
  public static readonly UserAccountEventDtoPageToUserAccountEventPage = new MappingPair<
    PageResponse<UserAccountEventDto>,
    PageResponse<UserAccountEvent>
  >();

  public static readonly WalletDtoToWallet = new MappingPair<WalletDto, Wallet>();
  public static readonly WalletDtoPageToWalletPage = new MappingPair<
    PageResponse<WalletDto>,
    PageResponse<Wallet>
  >();

  public static readonly CurrencyExchangeRateDataDtoToCurrencyQuote = new MappingPair<
    CurrencyExchangeRateDataDto,
    CurrencyQuote
  >();

  public static readonly CurrencyExchangeRateDtoToCurrencyExchangeRate = new MappingPair<
    CurrencyExchangeRateDto,
    CurrencyExchangeRate
  >();

  public static readonly PaymentDtoToPayment = new MappingPair<PaymentDto, Payment>();
  public static readonly PaymentDtoPageToPaymentPage = new MappingPair<
    PageResponse<PaymentDto>,
    PageResponse<Payment>
  >();

  public static readonly CurrencyTransactionDtoToCurrencyTransaction = new MappingPair<
    CurrencyTransactionDto,
    CurrencyTransaction
  >();

  public static readonly CurrencyTransactionDtoPageToCurrencyTransactionPage = new MappingPair<
    PageResponse<CurrencyTransactionDto>,
    PageResponse<CurrencyTransaction>
  >();

  public static readonly UserProfileAddressDtoToUserProfileAddress = new MappingPair<
    UserProfileAddressDto,
    UserProfileAddress
  >();

  public static readonly UserProfilePreferenceDtoToUserProfilePreference = new MappingPair<
    UserProfilePreferenceDto,
    UserProfilePreference
  >();

  public static readonly UserProfileDtoToUserProfile = new MappingPair<
    UserProfileDto,
    UserProfile
  >();

  public static readonly PasswordResetTokenDtoToPasswordResetToken = new MappingPair<
    PasswordResetTokenDto,
    PasswordResetToken
  >();

  public static readonly PasswordTokenUserDtoToPasswordTokenUser = new MappingPair<
    PasswordTokenUserDto,
    PasswordTokenUser
  >();

  public static readonly CountryDtoToCountry = new MappingPair<CountryDto, Country>();

  public static readonly CountryDtoPageToCountryPage = new MappingPair<
    PageResponse<CountryDto>,
    PageResponse<Country>
  >();

  public static readonly CurrencyDtoToCurrency = new MappingPair<CurrencyDto, Currency>();

  public static readonly CurrencyDtoPageToCurrencyPage = new MappingPair<
    PageResponse<CurrencyDto>,
    PageResponse<Currency>
  >();

  public static CryptoCurrencyDtoToCryptoCurrency = new MappingPair<
    CryptoCurrencyDto,
    CryptoCurrency
  >();

  public static CryptoCurrencyDtoPageToCryptoCurrencyPage = new MappingPair<
    PageResponse<CryptoCurrencyDto>,
    PageResponse<CryptoCurrency>
  >();

  public static CurrencyPairDtoToCurrencyPair = new MappingPair<CurrencyPairDto, CurrencyPair>();

  public static CurrencyPairDtoPageToCurrencyPairPage = new MappingPair<
    PageResponse<CurrencyPairDto>,
    PageResponse<CurrencyPair>
  >();

  public static PaymentMethodDtoToPaymentMethod = new MappingPair<
    PaymentMethodDto,
    PaymentMethod
  >();

  public static PaymentMethodDtoPageToPaymentMethodPage = new MappingPair<
    PageResponse<PaymentMethodDto>,
    PageResponse<PaymentMethod>
  >();

  public static UserDtoToUser = new MappingPair<UserDto, User>();
  public static UserRoleDtoToUserRole = new MappingPair<UserRoleDto, UserRole>();

  public static LoginDtoToLoginResponse = new MappingPair<LoginDto, LoginResponse>();

  public static UserToUserPrincipal = new MappingPair<User, UserPrincipal>();

  public static LoginResponseToUserAccessCredentials = new MappingPair<
    LoginResponse,
    UserAccessCredentials
  >();

  public static AdminUserAccountDtoToAdminUserAccount = new MappingPair<
    AdminUserAccountDto,
    AdminUserAccount
  >();

  public static AdminUserAddressDtoToAdminUserAddress = new MappingPair<
    AdminUserAddressDto,
    AdminUserAddress
  >();

  public static AdminUserDtoToAdminUser = new MappingPair<AdminUserDto, AdminUser>();

  public static AdminUserDtoPageToAdminUserPage = new MappingPair<
    PageResponse<AdminUserDto>,
    PageResponse<AdminUser>
  >();

  public static UserRoleToUserRoleListOption = new MappingPair<UserRole, ListOption<UserRole>>();

  public static CountryToCountryListOption = new MappingPair<Country, ListOption<Country>>();

  public static CurrencyToCurrencyListOption = new MappingPair<Currency, ListOption<Currency>>();

  public static CurrencyPairToCurrencyPairListOption = new MappingPair<
    CurrencyPair,
    ListOption<CurrencyPair>
  >();

  public static PaymentMethodToPaymentMethodListOption = new MappingPair<
    PaymentMethod,
    ListOption<PaymentMethod>
  >();

  public static WalletToWalletListOption = new MappingPair<Wallet, ListOption<Wallet>>();

  public static AddressFormValueToRegisterAddressRequest = new MappingPair<
    RawValue<FormGroup<AddressForm>>,
    RegisterAddressRequest
  >();

  public static PersonalInformationFormValueToRegisterPersonalInformationRequest = new MappingPair<
    RawValue<FormGroup<PersonalInformationForm>>,
    Omit<RegisterRequest, 'address' | 'preference' | 'account'>
  >();

  public static PreferenceFormValueToRegisterPreferenceRequest = new MappingPair<
    RawValue<FormGroup<PreferenceForm>>,
    RegisterPreferenceRequest
  >();

  public static AccountFormValueToRegisterAccountRequest = new MappingPair<
    RawValue<FormGroup<AccountForm>>,
    RegisterAccountRequest
  >();

  public static AddressFormValueToUserAddressRequest = new MappingPair<
    RawValue<FormGroup<AddressForm>>,
    UserAddressRequest
  >();

  public static PersonalInformationFormValueToUserPersonalInformationRequest = new MappingPair<
    RawValue<FormGroup<PersonalInformationForm>>,
    Omit<AddUser, 'address' | 'preference' | 'account'>
  >();

  public static PreferenceFormValueToUserPreferenceRequest = new MappingPair<
    RawValue<FormGroup<PreferenceForm>>,
    UserPreferenceRequest
  >();

  public static AccountFormValueToUserAccountRequest = new MappingPair<
    RawValue<FormGroup<AccountForm>>,
    UserAccountRequest
  >();

  constructor() {
    super();

    this.createAutoMap(MappingProfile.WalletDtoToWallet, {});

    this.createAutoMap(MappingProfile.WalletDtoPageToWalletPage, {
      data: (opt) => opt.mapFromUsing((source) => source.data, MappingProfile.WalletDtoToWallet),
    });

    this.createAutoMap(MappingProfile.AccountEventDtoToAccountEvent, {});

    this.createAutoMap(MappingProfile.UserAccountEventDtoToUserAccountEvent, {
      type: (opt) => opt.mapFrom((src) => src.event.type),
      description: (opt) => opt.mapFrom((src) => src.event.description),
    });

    this.createAutoMap(MappingProfile.UserAccountEventDtoPageToUserAccountEventPage, {
      data: (opt) =>
        opt.mapFromUsing(
          (source) => source.data,
          MappingProfile.UserAccountEventDtoToUserAccountEvent
        ),
    });

    this.createAutoMap(MappingProfile.HttpMessageDtoToHttpMessage, {});

    this.createAutoMap(MappingProfile.CurrencyExchangeRateDataDtoToCurrencyQuote, {});

    this.createAutoMap(MappingProfile.CurrencyExchangeRateDtoToCurrencyExchangeRate, {
      quotes: (opt) => opt.mapFrom((src) => src.data),
    });

    this.createAutoMap(MappingProfile.PaymentDtoToPayment, {});

    this.createAutoMap(MappingProfile.PaymentDtoPageToPaymentPage, {
      data: (opt) => opt.mapFromUsing((src) => src.data, MappingProfile.PaymentDtoToPayment),
    });

    this.createAutoMap(MappingProfile.CurrencyTransactionDtoToCurrencyTransaction, {
      sourceWallet: (opt) =>
        opt.mapFromUsing((src) => src.sourceWallet, MappingProfile.WalletDtoToWallet),
      destinationWallet: (opt) =>
        opt.mapFromUsing((src) => src.destinationWallet, MappingProfile.WalletDtoToWallet),
    });

    this.createAutoMap(MappingProfile.CurrencyTransactionDtoPageToCurrencyTransactionPage, {
      data: (opt) =>
        opt.mapFromUsing(
          (src) => src.data,
          MappingProfile.CurrencyTransactionDtoToCurrencyTransaction
        ),
    });

    this.createAutoMap(MappingProfile.UserProfileAddressDtoToUserProfileAddress, {});
    this.createAutoMap(MappingProfile.UserProfilePreferenceDtoToUserProfilePreference, {});

    this.createAutoMap(MappingProfile.UserProfileDtoToUserProfile, {
      address: (opt) =>
        opt.mapFromUsing(
          (src) => src.address,
          MappingProfile.UserProfileAddressDtoToUserProfileAddress
        ),
      preference: (opt) =>
        opt.mapFromUsing(
          (src) => src.preference,
          MappingProfile.UserProfilePreferenceDtoToUserProfilePreference
        ),
    });

    this.createAutoMap(MappingProfile.PasswordResetTokenDtoToPasswordResetToken, {});

    this.createAutoMap(MappingProfile.PasswordTokenUserDtoToPasswordTokenUser, {});

    this.createAutoMap(MappingProfile.CountryDtoToCountry, {});
    this.createAutoMap(MappingProfile.CountryDtoPageToCountryPage, {
      data: (opt) => opt.mapFromUsing((src) => src.data, MappingProfile.CountryDtoToCountry),
    });

    this.createAutoMap(MappingProfile.CurrencyDtoToCurrency, {});
    this.createAutoMap(MappingProfile.CurrencyDtoPageToCurrencyPage, {
      data: (opt) => opt.mapFromUsing((src) => src.data, MappingProfile.CurrencyDtoToCurrency),
    });

    this.createAutoMap(MappingProfile.CryptoCurrencyDtoToCryptoCurrency, {});
    this.createAutoMap(MappingProfile.CryptoCurrencyDtoPageToCryptoCurrencyPage, {
      data: (opt) =>
        opt.mapFromUsing((src) => src.data, MappingProfile.CryptoCurrencyDtoToCryptoCurrency),
    });

    this.createAutoMap(MappingProfile.CurrencyPairDtoToCurrencyPair, {});
    this.createAutoMap(MappingProfile.CurrencyPairDtoPageToCurrencyPairPage, {
      data: (opt) =>
        opt.mapFromUsing((src) => src.data, MappingProfile.CurrencyPairDtoToCurrencyPair),
    });

    this.createAutoMap(MappingProfile.PaymentMethodDtoToPaymentMethod, {});
    this.createAutoMap(MappingProfile.PaymentMethodDtoPageToPaymentMethodPage, {
      data: (opt) =>
        opt.mapFromUsing((src) => src.data, MappingProfile.PaymentMethodDtoToPaymentMethod),
    });

    this.createAutoMap(MappingProfile.UserDtoToUser, {
      username: (opt) => opt.mapFrom((src) => src.account.username),
      isVerified: (opt) => opt.mapFrom((src) => src.account.isVerified),
      roles: (opt) => opt.mapFrom((src) => src.account.roles),
    });

    this.createAutoMap(MappingProfile.UserRoleDtoToUserRole, {});

    this.createAutoMap(MappingProfile.LoginDtoToLoginResponse, {
      user: (opt) => opt.mapFromUsing((src) => src.user, MappingProfile.UserDtoToUser),
    });

    this.createAutoMap(MappingProfile.UserToUserPrincipal, {});
    this.createAutoMap(MappingProfile.LoginResponseToUserAccessCredentials, {
      username: (opt) => opt.mapFrom((src) => src.user.username),
    });

    this.createAutoMap(MappingProfile.AdminUserAccountDtoToAdminUserAccount, {});
    this.createAutoMap(MappingProfile.AdminUserAddressDtoToAdminUserAddress, {});
    this.createAutoMap(MappingProfile.AdminUserDtoToAdminUser, {
      account: (opt) =>
        opt.mapFromUsing(
          (src) => src.account,
          MappingProfile.AdminUserAccountDtoToAdminUserAccount
        ),
      address: (opt) =>
        opt.mapFromUsing(
          (src) => src.address,
          MappingProfile.AdminUserAddressDtoToAdminUserAddress
        ),
    });

    this.createAutoMap(MappingProfile.AdminUserDtoPageToAdminUserPage, {
      data: (opt) => opt.mapFromUsing((src) => src.data, MappingProfile.AdminUserDtoToAdminUser),
    });

    this.createAutoMap(MappingProfile.UserRoleToUserRoleListOption, {
      avatar: (opt) => opt.mapFrom((src) => src.code),
      value: (opt) => opt.mapFrom((src) => src),
    });

    this.createAutoMap(MappingProfile.CountryToCountryListOption, {
      avatar: (opt) => opt.mapFrom((src) => src.code),
      value: (opt) => opt.mapFrom((src) => src),
    });

    this.createAutoMap(MappingProfile.CurrencyToCurrencyListOption, {
      avatar: (opt) => opt.mapFrom((src) => src.code),
      value: (opt) => opt.mapFrom((src) => src),
    });

    this.createAutoMap(MappingProfile.CurrencyPairToCurrencyPairListOption, {
      code: (opt) => opt.mapFrom((src) => src.type),
      avatar: (opt) => opt.mapFrom((src) => src.type),
      value: (opt) => opt.mapFrom((src) => src),
    });

    this.createAutoMap(MappingProfile.PaymentMethodToPaymentMethodListOption, {
      avatar: (opt) => opt.mapFrom((src) => src.code),
      value: (opt) => opt.mapFrom((src) => src),
    });

    this.createAutoMap(MappingProfile.WalletToWalletListOption, {
      code: (opt) => opt.mapFrom((src) => src.currency.code),
      name: (opt) => opt.mapFrom((src) => `${src.currency.name} Wallet`),
      avatar: (opt) => opt.mapFrom((src) => src.currency.code),
      value: (opt) => opt.mapFrom((src) => src),
    });

    this.createAutoMap(
      MappingProfile.PersonalInformationFormValueToRegisterPersonalInformationRequest,
      {
        emailAddress: (opt) => opt.mapFrom((src) => src.emailAddress.trim().toLowerCase()),
      }
    );

    this.createAutoMap(MappingProfile.AddressFormValueToRegisterAddressRequest, {
      countryCode: (opt) => opt.mapFrom((src) => (src.country && src.country.code) || ''),
    });

    this.createAutoMap(MappingProfile.PreferenceFormValueToRegisterPreferenceRequest, {
      currencyCode: (opt) => opt.mapFrom((src) => (src.currency && src.currency.code) || ''),
      notificationMethods: (opt) =>
        opt.mapFrom((src) =>
          (['sms', 'email'] as const).filter((item) => src.notificationMethods[item])
        ),
    });

    this.createAutoMap(MappingProfile.AccountFormValueToRegisterAccountRequest, {
      username: (opt) => opt.mapFrom((src) => src.username.trim().toLowerCase()),
    });

    this.createAutoMap(
      MappingProfile.PersonalInformationFormValueToUserPersonalInformationRequest,
      {
        emailAddress: (opt) => opt.mapFrom((src) => src.emailAddress.trim().toLowerCase()),
      }
    );

    this.createAutoMap(MappingProfile.AddressFormValueToUserAddressRequest, {
      countryCode: (opt) => opt.mapFrom((src) => (src.country && src.country.code) || ''),
    });

    this.createAutoMap(MappingProfile.PreferenceFormValueToUserPreferenceRequest, {
      currencyCode: (opt) => opt.mapFrom((src) => (src.currency && src.currency.code) || ''),
      notificationMethods: (opt) =>
        opt.mapFrom((src) =>
          (['sms', 'email'] as const).filter((item) => src.notificationMethods[item])
        ),
    });

    this.createAutoMap(MappingProfile.AccountFormValueToUserAccountRequest, {
      username: (opt) => opt.mapFrom((src) => src.username.trim().toLowerCase()),
      roles: (opt) => opt.mapFrom((src) => (src.role && [src.role.value.name]) || []),
    });
  }
}
