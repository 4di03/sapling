/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This software may be used and distributed according to the terms of the
 * GNU General Public License version 2.
 */

use anyhow::Error;
use fbinit::FacebookInit;

#[fbinit::test]
async fn dummy_test(_: FacebookInit) -> Result<(), Error> {
    Ok(())
}
