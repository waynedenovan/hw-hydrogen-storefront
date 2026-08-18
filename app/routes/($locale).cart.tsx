import {type LoaderFunctionArgs, type ActionFunctionArgs, data} from 'react-router';
import {useLoaderData} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {CartMain} from '~/components/CartMain';

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let result: any;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate:
      result = await cart.updateDiscountCodes(inputs.discountCodes);
      break;
    case CartForm.ACTIONS.GiftCardCodesAdd:
      result = await cart.addGiftCardCodes([inputs.giftCardCode]);
      break;
    case CartForm.ACTIONS.GiftCardCodesRemove:
      result = await cart.removeGiftCardCodes(inputs.giftCardCodes);
      break;
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
      break;
    case CartForm.ACTIONS.DeliveryAddressesAdd:
      result = await cart.addDeliveryAddresses(inputs.addresses);
      break;
    case CartForm.ACTIONS.DeliveryAddressesReplace:
      result = await cart.replaceDeliveryAddresses(inputs.addresses);
      break;
    default:
      throw new Error(`Unknown action: ${action}`);
  }

  const userErrors = result?.userErrors || [];
  if (userErrors.length > 0) {
    console.warn('[cart] userErrors:', userErrors.map((e: {message: string}) => e.message).join(', '));
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(cartId) : new Headers();
  const status = userErrors.length > 0 ? 422 : 200;

  return data(result, {status, headers});
}

export async function loader({context}: LoaderFunctionArgs) {
  const {cart, storefront} = context;
  const expectedCountry = storefront.i18n.country;

  let cartData = await cart.get();

  if (cartData) {
    const currentCountry = cartData.buyerIdentity?.countryCode;
    if (!currentCountry || currentCountry !== expectedCountry) {
      console.log(
        `[cart-loader] Syncing buyerIdentity: ${currentCountry ?? 'none'} -> ${expectedCountry}`,
      );
      await cart.updateBuyerIdentity({countryCode: expectedCountry});
      cartData = await cart.get();
    }
  }

  return {cart: cartData};
}

export default function Cart() {
  const {cart} = useLoaderData<typeof loader>();

  return (
    <div className="cart max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <CartMain cart={cart} layout="page" />
    </div>
  );
}
