import Tokenizr from "tokenizr";
import { Command } from "./parse";

export const lexer = new Tokenizr();

const callsignRegexp = `(?<callsign>([a-z0-9]+/)?[a-z0-9_]+(/[a-z0-9]+)?)`;

lexer.rule(new RegExp(`station ${callsignRegexp}`, "i"), (ctx, match) => {
  ctx.accept(Command.Station, match.groups?.["callsign"]);
});
lexer.rule(new RegExp(`operator ${callsignRegexp}`, "i"), (ctx, match) => {
  ctx.accept(Command.Operator, match[1]);
});
lexer.rule(/date (\d{8})/, (ctx, match) => {
  ctx.accept(Command.Date, match[1]);
});
lexer.rule(/(\d+\.\d+)/, (ctx, match) => {
  ctx.accept(Command.Freq, match[1]);
});
lexer.rule(/mode (\w+)/i, (ctx, match) => {
  ctx.accept(Command.Mode, match[1]?.toUpperCase());
});
lexer.rule(/timeOn ([0-2][0-9][0-5][0-9]([0-9][0-9])?)/i, (ctx, match) => {
  ctx.accept(Command.TimeOn, match[1]);
});
lexer.rule(/([0-2][0-9][0-5][0-9])/, (ctx, match) => {
  ctx.accept(Command.TimeOn, match[1]);
});
lexer.rule(/call ([0-9a-z/]+)/i, (ctx, match) => {
  ctx.accept(Command.Call, match[1]);
});
lexer.rule(/s(-?\+?\d+)/, (ctx, match) => {
  ctx.accept(Command.RstSent, match[1]);
});
lexer.rule(/r(-?\+?\d+)/i, (ctx, match) => {
  ctx.accept(Command.RstRcvd, match[1]);
});
lexer.rule(/sota ([a-zA-Z0-9/-]+)/i, (ctx, match) => {
  ctx.accept(Command.Sota, match[1]?.toUpperCase());
});
lexer.rule(/mysota ([a-z0-9/-]+)/i, (ctx, match) => {
  ctx.accept(Command.MySota, match[1]?.toUpperCase());
});
lexer.rule(/wwff ([a-zA-Z0-9-]+)/i, (ctx, match) => {
  ctx.accept(Command.Wwff, match[1]?.toUpperCase());
});
lexer.rule(/mywwff ([a-zA-Z0-9-]+)/i, (ctx, match) => {
  ctx.accept(Command.MyWwff, match[1]?.toUpperCase());
});
lexer.rule(/pota ([a-zA-Z0-9-]+)/i, (ctx, match) => {
  ctx.accept(Command.Pota, match[1]?.toUpperCase());
});
lexer.rule(/mypota ([a-zA-Z0-9-]+)/i, (ctx, match) => {
  ctx.accept(Command.MyPota, match[1]?.toUpperCase());
});
lexer.rule(/gridsquare ([a-z0-9-]+)/i, (ctx, match) => {
  ctx.accept(Command.GridSquare, match[1]?.toUpperCase());
});
lexer.rule(/mygridsquare ([a-z0-9-]+)/i, (ctx, match) => {
  ctx.accept(Command.MyGridSquare, match[1]?.toUpperCase());
});
lexer.rule(/txpwr (\d+)/i, (ctx, match) => {
  ctx.accept(Command.TxPwr, match[1]);
});
lexer.rule(/ /, (ctx) => ctx.ignore());
