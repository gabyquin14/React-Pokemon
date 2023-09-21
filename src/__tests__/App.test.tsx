import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon/:id", (req, res, ctx) => {
    const { id } = req.params;

    // Mock the response for a specific Pokemon ID
    return res(
      ctx.status(200),
      ctx.json({
        name: `Pokemon ${id}`,
        sprites: { front_default: `image_${id}.png` },
        types: [{ type: { name: `Type ${id}` } }],
        stats: [{ stat: { name: `Stat ${id}` }, base_stat: id }],
        id: id,
      })
    );
  })
);

describe("App", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders App and title of the project", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText(/Welcome to Pokedex/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("Gets api data and display it", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    //These tests check that the pokemons are being displayed in the app (Name, and photo)
    await waitFor(() => {
      expect(screen.getByText("Pokemon 1")).toBeInTheDocument();
    });

    expect(screen.getByTestId(/pokemon-cards/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Pokemon 1-front-sprite/i)).toBeInTheDocument();
  });
});
